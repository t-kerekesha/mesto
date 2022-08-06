// включение валидации
enableValidation({
  inputClass: 'popup__input',
  submitButtonSelector: '.popup__save-button',
  selectorInput: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
});

function enableValidation(selectors) {
  const formList = Array.from(document.forms);
  formList.forEach(function(form) {
    const submitButton = form.querySelector(selectors.submitButtonSelector);
    setDisabledState(submitButton, isFormInvalid(form, selectors));  // изменение состояния кнопки

    form.addEventListener('input', function(event) {
      if (event.target.classList.contains(selectors.inputClass)) {
        checkValidity(form, event.target, selectors);
        setDisabledState(submitButton, isFormInvalid(form, selectors));
      }
    });
  });
}

// проверка на невалидность формы
function isFormInvalid(form, selectors) {
  const inputList = Array.from(form.querySelectorAll(selectors.selectorInput));
  return inputList.some(function(input) {
    return !isInputValid(input);
  });
}

function isInputValid(input) {
  return input.validity.valid;
}

// проверка валидности ввода
function checkValidity(form, input, selectors) {
  if (!isInputValid(input)) {
    showInputError(form, input, input.validationMessage, selectors);
  } else {
    hideInputError(form, input, selectors);
  }
}

function showInputError(form, input, errorMessage, selectors) {
  const error = form.querySelector(`.${input.id}-error`);
  error.textContent = errorMessage;
  error.classList.add(selectors.errorClass);
  input.classList.add(selectors.inputErrorClass);
}

function hideInputError(form, input, selectors) {
  const error = form.querySelector(`.${input.id}-error`);
  error.textContent = '';
  error.classList.remove(selectors.errorClass);
  input.classList.remove(selectors.inputErrorClass);
}

function setDisabledState(button, bool) {
  button.disabled = bool;
}
