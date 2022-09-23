import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, form, handleFormSubmit }) {
    super({ popupSelector });
    this._form = form;
    this._inputList = this._popup.querySelectorAll('.form__input');
    this._submitButton = this._form.querySelector('.form__save-button');
    this._defaultTextButton = this._submitButton.textContent;
    this._formValues = {};
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setInputValues(formValues) {
    this._formValues = formValues;
    this._inputList.forEach(input => {
      input.value = this._formValues[input.name];
    });
  }

  open() {
    super.open();
    setTimeout(() => {
      this._inputList[0].focus();
    }, 200);
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault(); // отмена стандартной отправки формы
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  renderLoadingData(isLoading) {
    if(isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._defaultTextButton;
    }
  }
}
