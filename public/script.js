'use strict';

//-----------------------------------------------------------------------------------------------------------
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const wrapper = document.querySelector('.wrapper');
const form = document.querySelectorAll('.form');
const submitInput = form[0].querySelector('button[type="submit"]');
const bCountry = document.querySelector('.b-country');
const formC = document.querySelector('.form');
// const test = document.querySelector('.wrapper');

const renderCountry = data => {
  const html = `
    <article class="country">
      <img class="country__img" src=${data.flags.png} />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)}<span style="font-size: 15px;">&nbspM</span></p>
        <p class="country__row"><span>🗣️</span>${
          Object.entries(data.languages)[0][1]
        }</p>
        <p class="country__row"><span>💰</span>${
          Object.entries(Object.entries(data.currencies)[0][1])[0][1]
        }</p>
      </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const getCountryData = country => {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]))
    .catch(err => alert('Country Not Found! 👀'))
    .finally(() => {
      countriesContainer.style.opacity = 1;
      bCountry.style.display = 'block';
    });
};

const getFormData = e => {
  e.preventDefault();

  formC.remove();

  let formData = new FormData(form[0]);
  let inputCountries = formData.get('countries');
  let country = inputCountries.split(', ');

  for (let ct of country) {
    getCountryData(ct);
  }
};

document.addEventListener(
  'DOMContentLoaded',
  function () {
    submitInput.addEventListener('click', getFormData, false);
  },
  false
);
