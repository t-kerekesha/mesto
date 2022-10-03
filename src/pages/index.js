import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupConfirmDelete from '../scripts/components/PopupConfirmDelete.js';
import Tooltip from '../scripts/components/Tooltip.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

import {
  buttonEdit,
  buttonAdd,
  avatarEdit,
  validationParams,
  formValidators,
  selectors
} from '../utils/constants.js';

import './index.css';
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
  nameSelector: selectors.nameSelector,
  aboutSelector: selectors.aboutSelector,
  avatarSelector: selectors.avatarSelector
});

api.getAllInfo()
  .then((dataFromServer) => {
    // UserInfo
    const user = dataFromServer[0];
    userInfo.setUserInfo(user);
    userInfo.setProfileAvatar(user.avatar);
    userInfo.id = user._id;

    // LoadCard
    const initialItems = dataFromServer[1];
    galeryList.renderItems(initialItems);
  })
  .catch((error) => {
    console.log(error);
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
          card.like();
          card.updateCounterLikes(data.likes);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openTooltip: (pageX, pageY) => {
      if(card.likes.length > 0) {
        listLikes.renderItems(card.likes);
        tooltipLikes.open(pageX, pageY);
      }
    },
    closeTooltip: () => {
      tooltipLikes.close();
      tooltipLikes.removePreviews();
    }
  });
  const galeryItem = card.createCard();
  card.renderForUser(userInfo.id);
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
      popupEditProfile.close();
    })
    .catch((error) => {
      console.log(error);
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
      popupAddImage.close();
    })
    .catch((error) => {
      console.log(error);
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
        popupEditAvatar.close();
      })
      .catch((error) => {
        console.log(error);
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
        popupConfirmDelete.close();
      })
      .catch((error) => {
        console.log(error);
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

const tooltipLikes = new Tooltip({
  popupSelector: selectors.tooltipLikesSelector
});
const listLikes = new Section({
  renderer: (like) => {
    const preview = tooltipLikes.createPreview(like.avatar);
    listLikes.addItem(preview);
  },
  containerSelector: selectors.tooltipLikesSelector
});

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
