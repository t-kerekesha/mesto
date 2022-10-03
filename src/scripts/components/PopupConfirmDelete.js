import Popup from "./Popup.js";

export default class PopupConfirmDelete extends Popup {
  constructor({ popupSelector, handleConfirmDelete }) {
    super({ popupSelector });
    this._handleConfirmDelete = handleConfirmDelete;
  }

  open(card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('click', (event) => {
      if(event.target.classList.contains('form__save-button')) {
        this._handleConfirmDelete(this._card);
      }
    });
  }
}
