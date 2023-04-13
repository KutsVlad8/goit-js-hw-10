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

  fetchCountries(inputValue)
    .then(countries => {
      if (countries.length > 10) {
        throw new Error(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length === 1) {
        const createInfo = countries.reduce(
          (markup, country) => markup + creatInfo(country),
          ''
        );
        updateCountryList(createInfo);
      } else {
        const createList = countries.reduce(
          (markup, country) => markup + creatList(country),
          ''
        );
        updateCountryList(createList);
      }
    })
    .catch(onError);
}

function creatInfo({ capital, flags, languages, name, population }) {
  return `
  	<img src="${flags.svg}" alt="flag" width="100">
  	<h2>${name.official}</h2>
  <p>Capital: ${capital[0]}</p>
  <p>Languages: ${Object.values(languages)}</p>
  <p>Population: ${population}</p>
  `;
}

function creatList({ flags, name }) {
  return `
  <li>
  <img src="${flags.svg}" alt="flag" width="100">
  <p>
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

function onError(error) {
  console.error(error);
}
