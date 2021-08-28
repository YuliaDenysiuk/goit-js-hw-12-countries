import './css/styles.css';
import { error, defaults } from '../node_modules/@pnotify/core/dist/PNotify.js';
import debounce from 'lodash.debounce';
import {searchInputRef, resultsContainerRef} from './js/getRefs';
import API from './js/fetchCountries';
import allResultsTemplate from './templates/all-results.hbs';
import oneCountryTemplate from './templates/one-country-result.hbs';

searchInputRef.addEventListener('input', debounce(onInputSearch, 500));
defaults.delay = 2000;

function onInputSearch(e) {
  const searchValue = e.target.value;

  API.fetchCountry(searchValue)
    .then(renderResultsList)
    .catch(onError)
}

function renderResultsList(countryName) {
  const allResultsMarkup = allResultsTemplate(countryName);
  const oneCountryMarkup = oneCountryTemplate(countryName);
  const maxLength = 10;

  if (countryName.length > maxLength) {
    return onFetchError();
  }

  if (countryName.length === 1) {
    resultsContainerRef.innerHTML = oneCountryMarkup;
  } else {
    resultsContainerRef.innerHTML = allResultsMarkup;
  };
  console.log(countryName)
}

function onFetchError() {
  error({
    text: 'Too many matches found. Please enter a more specific query!',
  })  
  
  resultsContainerRef.innerHTML = "";
};

function onError() {
  if (searchInputRef.value === "") {
    resultsContainerRef.innerHTML = "";
    return;
  }
  
  error({
    text: 'Such country is not found. Please enter a more specific query!',
  })
  
  resultsContainerRef.innerHTML = "";
}