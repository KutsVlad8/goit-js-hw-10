import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries.js';

const refs = {
  input: document.getElementById('search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const inputValue = event.target.value.trim();

  if (inputValue.length === 0) {
    refs.list.innerHTML = '';
    refs.info.innerHTML = '';
    return;
  }

  fetchCountries(inputValue).then(createCountries).catch(onError);
}

function createCountries(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length === 1) {
    refs.list.innerHTML = '';
    refs.info.innerHTML = '';
    const createInfo = countries.reduce(
      (markup, country) => markup + creatInfo(country),
      ''
    );
    updateCountryInfo(createInfo);
  } else {
    refs.list.innerHTML = '';
    refs.info.innerHTML = '';
    const createList = countries.reduce(
      (markup, country) => markup + creatList(country),
      ''
    );
    updateCountryList(createList);
  }
}

function creatInfo({ capital, flags, languages, name, population }) {
  return `
  	<img src="${flags.svg}" alt="${flags.alt} || flag of country" width="100">
  	<h2>${name.official}</h2>
  <p>Capital: ${capital[0]}</p>
  <p>Languages: ${Object.values(languages)}</p>
  <p>Population: ${population} people</p>
  `;
}

function creatList({ flags, name }) {
  return `
  <li class="country-list__card">
  <img src="${flags.svg}" alt="${flags.alt} || flag of country" width="50">
  <p class="country-list__text">
  ${name.official}
  </p>
  </li>
  `;
}

function updateCountryList(markup) {
  refs.list.innerHTML = markup;
}

function updateCountryInfo(markup) {
  refs.info.innerHTML = markup;
}

function onError() {
  return Notiflix.Notify.failure('Country not found');
}
