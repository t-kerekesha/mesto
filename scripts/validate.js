// включение валидации
enableValidation({
  inputClass: 'popup__input',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

function enableValidation(selectors) {
  const formList = Array.from(document.forms);
  formList.forEach(function(form) {
    const submitButton = form.querySelector(selectors.submitButtonSelector);
    setDisabledState(submitButton, isFormInvalid(form));  // изменение состояния кнопки

    form.addEventListener('input', function(event) {
      if (event.target.classList.contains(selectors.inputClass)) {
        checkValidity(form, event.target);
        setDisabledState(submitButton, isFormInvalid(form));
      }
    });
  });
}

// проверка на невалидность формы
function isFormInvalid(form) {
  const inputList = Array.from(form.elements);
  return inputList.some(function(input) {
    return !isInputValid(input);
  });
}

function isInputValid(input) {
  return input.validity.valid;
}

// проверка валидности ввода
function checkValidity(form, input) {
  if (!isInputValid(input)) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
}

function showInputError(form, input, errorMessage) {
  const error = form.querySelector(`.${input.id}-error`);
  error.textContent = errorMessage;
  error.classList.add('popup__input-error_visible');
  input.classList.add('popup__input_type_error');
}

function hideInputError(form, input) {
  const error = form.querySelector(`.${input.id}-error`);
  error.textContent = '';
  error.classList.remove('popup__input-error_visible');
  input.classList.remove('popup__input_type_error');
}

function setDisabledState(button, bool) {
  button.disabled = bool;
}
