'use strict';
const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(ev) {
  ev.preventDefault();

  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (!email || !message) {
    alert('Будь ласка, заповніть обидва поля перед відправленням форми.');
    return;
  }
  const data = {
    email,
    message,
  };
  console.log(data);
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
}

function onFormInput() {
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  const data = {
    email,
    message,
  };

  saveToLs(STORAGE_KEY, data);
}

function saveToLs(key, value) {
  const zip = JSON.stringify(value);

  localStorage.setItem(key, zip);
}

function loadFromLs(key) {
  const zip = localStorage.getItem(key);

  try {
    return JSON.parse(zip) || {};
  } catch (error) {
    return {};
  }
}

function init() {
  const data = loadFromLs(STORAGE_KEY);
  form.elements.email.value = data.email || '';
  form.elements.message.value = data.message || '';
}
init();