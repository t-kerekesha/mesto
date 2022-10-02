import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector, imageSelector, captionSelector }) {
    super({ popupSelector });
    this._image = this._popup.querySelector(imageSelector);
    this._caption = this._popup.querySelector(captionSelector);
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
