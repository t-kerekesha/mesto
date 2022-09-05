import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
  }

  open() {
    // zoomImage.src = link;
    // zoomImage.alt = name;
    // zoomCaption.textContent = name;
    super.open();
  }
}
