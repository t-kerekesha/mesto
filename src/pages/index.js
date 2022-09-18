import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';

import {
  initialItems,
  buttonEdit,
  buttonAdd,
  validationParams,
  formValidators
} from '../utils/constants';

import './index.css';

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

function createCard({ name, link }) {
  const card = new Card({
    name: name,
    link: link
  }, {
    templateSelector: '#gallery-item-template',
    handleCardClick: () => {
      popupZoomImage.open(name, link);
    }
  });
  const galeryItem = card.createCard();
  return galeryItem;
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about'
});

const galeryList = new Section({
    items: initialItems,
    renderer: (item) => {
      const galeryItem = createCard(item);
      galeryList.addItem(galeryItem);
    }
  },
  '.gallery__list'
);

galeryList.renderItems();

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  form: document.forms.editProfile,
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData['name'], formData['about']);
  }
});
popupEditProfile.setEventListeners();

const popupAddImage = new PopupWithForm({
  popupSelector: '.popup_type_add-image',
  form: document.forms.addImage,
  handleFormSubmit: (formData) => {
    const galeryItem = createCard({
      name: formData['title'],
      link: formData['link']
    });
    galeryList.addItem(galeryItem);
  }
});
popupAddImage.setEventListeners();

const popupZoomImage = new PopupWithImage({
  popupSelector: '.popup_type_zoom-image',
  imageSelector: '.popup__zoom-image',
  captionSelector: '.popup__zoom-caption'
});
popupZoomImage.setEventListeners();

buttonEdit.addEventListener('click', function () {
  popupEditProfile.open();
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  formValidators['editProfile'].resetValidation();
});

buttonAdd.addEventListener('click', function () {
  popupAddImage.open();
  formValidators['addImage'].resetValidation();
});
