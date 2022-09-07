import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';

import './index.css';

const uralImage = new URL('../images/south-ural-kurumnik.jpg', import.meta.url);
const teriberkaImage = new URL('../images/teriberka.jpg', import.meta.url);
const altaiMarsImage = new URL('../images/altai-mars.jpg', import.meta.url);
const kareliyaImage = new URL('../images/kareliya.jpg', import.meta.url);
const southUralImage = new URL('../images/south-ural.jpg', import.meta.url);
const altaiImage = new URL('../images/altai.jpg', import.meta.url);

const profile = document.querySelector('.profile');
const buttonEdit = profile.querySelector('.profile__edit-button');
const buttonAdd = profile.querySelector('.profile__add-button');

// начальные картинки
const initialItems = [
  {
    name: 'Южный Урал',
    link: uralImage
  },
  {
    name: 'Териберка, Баренцово море',
    link: teriberkaImage
  },
  {
    name: 'Алтай',
    link: altaiMarsImage
  },
  {
    name: 'Карелия',
    link: kareliyaImage
  },
  {
    name: 'Южный Урал',
    link: southUralImage
  },
  {
    name: 'Алтай',
    link: altaiImage
  }
];

const validationParams = {
  inputClass: 'form__input',
  inputSelector: '.form__input',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_visible',
  submitButtonSelector: '.form__save-button'
};
const formValidators = {};

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

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about'
});

const galeryList = new Section({
    items: initialItems,
    renderer: (item) => {
      const card = new Card(
        item, {
          templateSelector: '#gallery-item-template',
          handleCardClick: () => {
            popupZoomImage.open(item.name, item.link);
          }
      });
      const galeryItem = card.createCard();
      galeryList.addItem(galeryItem);
    }
  },
  '.gallery__list');

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
    const card = new Card({
        name: formData['title'],
        link: formData['link']
      }, {
        templateSelector: '#gallery-item-template',
        handleCardClick: () => {
          popupZoomImage.open(formData['title'], formData['link']);
        }
    });
    const galeryItem = card.createCard();
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
