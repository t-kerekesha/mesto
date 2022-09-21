import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

import {
  initialItems,
  buttonEdit,
  buttonAdd,
  validationParams,
  formValidators
} from '../utils/constants';

import './index.css';
import PopupConfirmDelete from '../scripts/components/PopupConfirmDelete.js';
import { data } from 'autoprefixer';

// API

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-51',
  headers: {
    authorization: '9e7255a8-14b6-4bc0-9fe9-419fec94bcd2',
    'Content-Type': 'application/json'
  }
});

// UserInfo

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar'
});

api.getUserInfo()
  .then((data) => {
    console.log(data)
    userInfo.setUserInfo(data);
    userInfo.setProfileAvatar(data.avatar);
    userInfo.id = data._id;
  });

// LoadCard

api.getInitialCards()
  .then((initialItems) => {
    console.log(initialItems)
    galeryList.renderItems(initialItems);
  });

const galeryList = new Section({
  renderer: (item) => {
    const galeryItem = createCard(item);
    galeryList.addItem(galeryItem);
  },
  containerSelector: '.gallery__list'
});

// createCard

function createCard({ name, link, likes, owner, _id }) {
  const card = new Card({
    name: name,
    link: link,
    likes: likes,
    owner: owner,
    cardId: _id
  }, {
    templateSelector: '#gallery-item-template',
    handleCardClick: () => {
      popupZoomImage.open(name, link);
    },
    handleDeleteClick: (card) => {
      popupConfirmDelete.open(card);
    },
    handleLikeClick: (cardId) => {
      api.likeCard(cardId, !card.isLiked)
        .then((data) => {
          card.updateCounterLikes(data.likes);
        });
    }
  });
  const galeryItem = card.createCard();
  card.renderForUser(userInfo.id);
console.log(card)
  return galeryItem;
}

// popups

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  form: document.forms.editProfile,
  handleFormSubmit: (formData) => {
    api.editUserInfo({
      name: formData['name'],
      about: formData['about']
    })
    .then((data) => {
      userInfo.setUserInfo(data);
    });
  }
});
popupEditProfile.setEventListeners();

const popupAddImage = new PopupWithForm({
  popupSelector: '.popup_type_add-image',
  form: document.forms.addImage,
  handleFormSubmit: (formData) => {
    api.addNewCard({
      name: formData['title'],
      link: formData['link']
    })
    .then((data) => {
      const galeryItem = createCard(data);
      galeryList.addItem(galeryItem);
      // galeryList._renderer(data);
    });
  }
});
popupAddImage.setEventListeners();

const popupConfirmDelete = new PopupConfirmDelete({
  popupSelector: '.popup_type_confirm-delete',
  form: document.forms.confirmDelete,
  handleConfirmDelete: (card) => {
    api.deleteCard(card.cardId)
      .then(() => {
        card.deleteCard();
      });
  }
});
popupConfirmDelete.setEventListeners();

const popupZoomImage = new PopupWithImage({
  popupSelector: '.popup_type_zoom-image',
  imageSelector: '.popup__zoom-image',
  captionSelector: '.popup__zoom-caption'
});
popupZoomImage.setEventListeners();

// Validation

function enableValidation(params) {
  const formList = Array.from(document.forms);
  formList.forEach((form) => {
    const validator = new FormValidator(params, form);
    const formName = form.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}
enableValidation(validationParams);

// EventListener

buttonEdit.addEventListener('click', function () {
  popupEditProfile.open();
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  formValidators['editProfile'].resetValidation();
});

buttonAdd.addEventListener('click', function () {
  popupAddImage.open();
  formValidators['addImage'].resetValidation();
});
