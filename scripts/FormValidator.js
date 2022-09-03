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
    return this._inputList.every((input) => {
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

  _setButtonState(bool) {
    this._submitButton.disabled = bool;
  }

  // включение валидации
  enableValidation() {
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._setButtonState(!this._isFormValid());  // изменение состояния кнопки

    this._form.addEventListener('input', (event) => {
      this._inputList.forEach((input) => {
        this._checkValidity(event.target);
        this._setButtonState(!this._isFormValid());
      });
    });
  }

  // сброс валидационных сообщений
  resetValidation() {
    this._setButtonState(!this._isFormValid());
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }
}
