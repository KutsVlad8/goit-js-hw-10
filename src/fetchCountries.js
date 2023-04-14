export default function fetchCountries(name) {
  const fields = 'fields=name,capital,population,flags,languages';

  return fetch(`https://restcountries.com/v3.1/name/${name}?${fields}`)
    .then(response => {
      return response.json();
    })
    .catch();
}

// function onError() {
//   return Notiflix.Notify.failure('Country not found');
// }
