import { cardSelectors } from "../../utils/constants.js";

export default class Card {
  constructor({ name, link, likes, owner, cardId },
      { templateSelector, handleCardClick, handleDeleteClick, handleLikeClick,
        openTooltip, closeTooltip }) {
    this._name = name;
    this._link = link;
    this.likes = likes;
    this._owner = owner;
    this.cardId = cardId;
    this.isLiked = false;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._openTooltip = openTooltip;
    this._closeTooltip = closeTooltip;

    this.deleteCard = this.deleteCard.bind(this);
    this.like = this.like.bind(this);

    this._selectors = cardSelectors;
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

    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick(this.cardId);
    });
    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteClick(this);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._buttonLike.addEventListener('mouseenter', (event) => {
      this._openTooltip(event.pageX, event.pageY);
    });

    this._buttonLike.addEventListener('mouseleave', this._closeTooltip);
  }

  // удаление картинки
  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  // лайк
  like() {
    this.isLiked = !this.isLiked;
    this._buttonLike.classList.toggle(this._selectors.likeActiveClass);
  }

  // создание картинки
  createCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector(this._selectors.imageSelector);
    this._cardCaption = this._card.querySelector(this._selectors.captionSelector);
    this._counterLikes = this._card.querySelector(this._selectors.counterLikesSelector);

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardCaption.textContent = this._name;
    this._counterLikes.textContent = this.likes.length;
    this._setEventListeners();

    return this._card;
  }

  setVisibleButtonDelete() {
    this._buttonDelete.classList.add(this._selectors.buttonDeleteVisibleClass);
  }

  updateCounterLikes(likes) {
    this._counterLikes.textContent = likes.length;
    this.likes = likes;
  }

  renderForUser(userId) {
    if(this._owner._id === userId) {
      this.setVisibleButtonDelete();
    }

    if(this.likes.find((user) => {
      return user._id === userId;
    })) {
      this.like();
    }
  }
}

