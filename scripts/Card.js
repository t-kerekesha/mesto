import { openPopupImage } from './index.js';

export default class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this.isLiked = false;
    this._templateSelector = templateSelector;
  }

  // получение разметки картинки
  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.gallery__list-item')
      .cloneNode(true);

    return template;
  }

  // установка слушателя событий
  _setEventListeners() {
    this._card.addEventListener('click', (event) => {
      if (event.target.classList.contains('gallery__delete-button')) {
        this._deleteCard();
      }
      if (event.target.classList.contains('gallery__like-button')) {
        this._like(event.target);
      }
      if (event.target.classList.contains('gallery__image')) {
        openPopupImage(this._name, this._link);
      }
    });
  }

  // удаление картинки
  _deleteCard() {
    this._card.remove();
  }

  // лайк
  _like(like) {
    this.isLiked = !this.isLiked;
    like.classList.toggle('gallery__like-button_active');
  }

  // создание картинки
  createCard() {
    this._card = this._getTemplate();
    this._setEventListeners();
    const image = this._card.querySelector('.gallery__image');
    const caption = this._card.querySelector('.gallery__caption');

    image.src = this._link;
    image.alt = this._name;
    caption.textContent = this._name;
    return this._card;
  }
}

