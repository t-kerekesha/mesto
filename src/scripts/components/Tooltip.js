import Popup from "./Popup.js";

export default class Tooltip extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._selectors = {
      templatePreviewSelector: '#preview-user-template',
      previewAvatarSelector: '.tooltip-likes__avatar'
    };
  }

  open(pageX, pageY) {
    this._popup.style.left = pageX + 'px';
    this._popup.style.top = pageY + 'px';
    super.open();
  }

  _getTemplatePreview() {
    const template = document
      .querySelector(this._selectors.templatePreviewSelector)
      .content
      .querySelector(this._selectors.previewAvatarSelector)
      .cloneNode(true);

    return template;
  }

  _counterPreview() {
    console.log(this._popup.children)
    return this._popup.children.length;
  }

  createPreview(avatar) {
    this._previewAvatar = this._getTemplatePreview();
    this._previewAvatar.src = avatar;
    return this._previewAvatar;
  }

  removePreviews() {
    while (this._popup.firstChild) {
      this._popup.removeChild(this._popup.firstChild);
    }
  }
}
