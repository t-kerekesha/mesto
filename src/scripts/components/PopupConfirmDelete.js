import Popup from "./Popup.js";

export default class PopupConfirmDelete extends Popup {
  constructor({ popupSelector, form, handleConfirmDelete }) {
    super({ popupSelector });
    this._form = form;
    this._handleConfirmDelete = handleConfirmDelete;
  }

  open(card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleConfirmDelete(this._card);
      this.close();
    });
  }
}
