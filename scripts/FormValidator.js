export default class FormValidator {
  constructor(settings, form) {
    this._inputClass = settings.inputClass;
    this._inputSelector = settings.inputSelector;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._form = form;
  }

  // проверка валидности формы
  _isFormValid() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    return inputList.every((input) => {
      return this._isInputValid(input);
    });
  }

  _isInputValid(input) {
    return input.validity.valid;
  }

  // проверка валидности ввода
  _checkValidity(input) {
    if (!this._isInputValid(input)) {
     this._showInputError(input, input.validationMessage);
    } else {
     this._hideInputError(input);
    }
  }

  _showInputError(input, errorMessage) {
    const error = this._form.querySelector(`.${input.id}-error`);
    error.textContent = errorMessage;
    error.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }

  _hideInputError(input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    error.textContent = '';
    error.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
  }

  setDisabledStateButton(button, bool) {
    button.disabled = bool;
  }

  // включение валидации
  enableValidation() {
    const submitButton = this._form.querySelector(this._submitButtonSelector);
    this.setDisabledStateButton(submitButton, !this._isFormValid());  // изменение состояния кнопки

    this._form.addEventListener('input', (event) => {
      if (event.target.classList.contains(this._inputClass)) {
        this._checkValidity(event.target);
        this.setDisabledStateButton(submitButton, !this._isFormValid());
      }
    });
  }
}
