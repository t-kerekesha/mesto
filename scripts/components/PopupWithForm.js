import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  close() {
    // event.target.reset();
    super.close();
  }

  setEventListeners() {
    formEditProfile.addEventListener('submit', (event) => {
      event.preventDefault(); // отмена стандартной отправки формы
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
