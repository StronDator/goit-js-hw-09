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

  if (!validateForm()) {
    return alert('All form fields must be filled in');
  }

  if (isFormDataNotEmpty()) {
    console.log(formData);
  }

  resetForm();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

function onFormInput(event) {
  const { name, value } = event.target;
  formData[name] = value.trim();
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  const savedFormData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

  if (savedFormData) {
    const { email, message } = savedFormData;
    refs.input.value = email || '';
    refs.textarea.value = message || '';
    formData.email = email || '';
    formData.message = message || '';
  }
}

function validateForm() {
  return Object.values(formData).every(value => value.trim() !== '');
}

function resetForm() {
  refs.form.reset();
  formData.email = '';
  formData.message = '';
}

function isFormDataNotEmpty() {
  return Object.keys(formData).length > 0;
}
