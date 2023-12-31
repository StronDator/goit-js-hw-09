'use strict';

const LOCALSTORAGE_KEY = 'feedback-form-state';
const formData = {};
const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input[name=email]'),
  textarea: document.querySelector('textarea[name=message]'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', onFormInput);

populateForm();

function onFormSubmit(event) {
  event.preventDefault();

  if (formData.email === '' || formData.message === '') {
    return alert('All form fields must be filled in');
  }

  console.log(formData);
  formData.email = '';
  formData.message = '';
  event.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  const savedInputEl = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

  if (savedInputEl) {
    refs.input.value = savedInputEl.email || '';
    refs.textarea.value = savedInputEl.message || '';
    formData.email = savedInputEl.email || '';
    formData.message = savedInputEl.message || '';
  }
}