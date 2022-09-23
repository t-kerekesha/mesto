import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupConfirmDelete from '../scripts/components/PopupConfirmDelete.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

import {
  buttonEdit,
  buttonAdd,
  avatarEdit,
  validationParams,
  formValidators,
  selectors
} from '../utils/constants';

import './index.css';
// import { data } from 'autoprefixer';

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
  nameSelector: selectors.nameSelector,
  aboutSelector: selectors.aboutSelector,
  avatarSelector: selectors.avatarSelector
});

api.getUserInfo()
  .then((data) => {
    console.log(data)
    userInfo.setUserInfo(data);
    userInfo.setProfileAvatar(data.avatar);
    userInfo.id = data._id;

    // LoadCard

    api.getInitialCards()
      .then((initialItems) => {
        console.log(initialItems)
        galeryList.renderItems(initialItems);
      });
  });

const galeryList = new Section({
  renderer: (item) => {
    const galeryItem = createCard(item);
    galeryList.addItem(galeryItem);
  },
  containerSelector: selectors.containerSelector
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
    templateSelector: selectors.templateSelector,
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
  popupSelector: selectors.popupEditProfileSelector,
  form: document.forms.editProfile,
  handleFormSubmit: (formData) => {
    popupEditProfile.renderLoadingData(true);
    api.editUserInfo({
      name: formData['name'],
      about: formData['about']
    })
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .finally(() => {
      popupEditProfile.renderLoadingData(false);
    });
  }
});
popupEditProfile.setEventListeners();

const popupAddImage = new PopupWithForm({
  popupSelector: selectors.popupAddImageSelector,
  form: document.forms.addImage,
  handleFormSubmit: (formData) => {
    popupAddImage.renderLoadingData(true);
    api.addNewCard({
      name: formData['title'],
      link: formData['link']
    })
    .then((data) => {
      const galeryItem = createCard(data);
      galeryList.addItem(galeryItem);
    })
    .finally(() => {
      popupAddImage.renderLoadingData(false);
    });
  }
});
popupAddImage.setEventListeners();

const popupEditAvatar = new PopupWithForm({
  popupSelector: selectors.popupEditAvatarSelector,
  form: document.forms.editAvatar,
  handleFormSubmit: (formData) => {
    popupEditAvatar.renderLoadingData(true);
    api.editUserAvatar(formData['avatar'])
      .then((data) => {
        userInfo.setProfileAvatar(data.avatar);
      })
      .finally(() => {
        popupEditAvatar.renderLoadingData(false);
      });
  }
});
popupEditAvatar.setEventListeners();

const popupConfirmDelete = new PopupConfirmDelete({
  popupSelector: selectors.popupConfirmDeleteSelector,
  handleConfirmDelete: (card) => {
    api.deleteCard(card.cardId)
      .then(() => {
        card.deleteCard();
      });
  }
});
popupConfirmDelete.setEventListeners();

const popupZoomImage = new PopupWithImage({
  popupSelector: selectors.popupZoomImageSelector,
  imageSelector: selectors.popupImageSelector,
  captionSelector: selectors.popupCaptionSelector
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

buttonEdit.addEventListener('click', function() {
  popupEditProfile.open();
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  formValidators['editProfile'].resetValidation();
});

buttonAdd.addEventListener('click', function() {
  popupAddImage.open();
  formValidators['addImage'].resetValidation();
});

avatarEdit.addEventListener('click', function() {
  popupEditAvatar.open();
  formValidators['editAvatar'].resetValidation();
});
