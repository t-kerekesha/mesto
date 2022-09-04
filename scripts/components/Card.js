export default class Card {
  constructor({ name, link }, templateSelector, openZoomImage) {
    this._name = name;
    this._link = link;
    this.isLiked = false;
    this._templateSelector = templateSelector;
    this._openZoomImage = openZoomImage;

    this._deleteCard = this._deleteCard.bind(this);
    this._like = this._like.bind(this);

    this._selectors = {
      listItemSelector: '.gallery__list-item',
      buttonLikeSelector: '.gallery__like-button',
      buttonDeleteSelector: '.gallery__delete-button',
      imageSelector: '.gallery__image',
      captionSelector: '.gallery__caption',
      likeActiveClass: 'gallery__like-button_active'
    };
  }

  // получение разметки картинки
  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(this._selectors.listItemSelector)
      .cloneNode(true);

    return template;
  }

  // установка слушателя событий
  _setEventListeners() {
    this._buttonLike = this._card.querySelector(this._selectors.buttonLikeSelector);
    this._buttonDelete = this._card.querySelector(this._selectors.buttonDeleteSelector);

    this._buttonLike.addEventListener('click', this._like);
    this._buttonDelete.addEventListener('click', this._deleteCard);
    this._cardImage.addEventListener('click', () => {
      this._openZoomImage(this._name, this._link);
    });
  }

  // удаление картинки
  _deleteCard() {
    this._card.remove();
  }

  // лайк
  _like() {
    this.isLiked = !this.isLiked;
    this._buttonLike.classList.toggle(this._selectors.likeActiveClass);
  }

  // создание картинки
  createCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector(this._selectors.imageSelector);
    this._cardCaption = this._card.querySelector(this._selectors.captionSelector);

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardCaption.textContent = this._name;
    this._setEventListeners();

    return this._card;
  }
}

