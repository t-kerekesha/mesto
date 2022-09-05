import Card from './components/Card.js';
import Section from './components/Section.js';
import FormValidator from './components/FormValidator.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import UserInfo from './components/UserInfo.js';

const profile = document.querySelector('.profile');
const buttonEdit = profile.querySelector('.profile__edit-button');
const buttonAdd = profile.querySelector('.profile__add-button');


// const galeryList = document.querySelector('.gallery__list');

const popups = document.querySelectorAll('.popup');
// const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = document.forms.editProfile;
const inputName = formEditProfile.elements.name;
const inputAbout = formEditProfile.elements.about;

// const popupAddImage = document.querySelector('.popup_type_add-image');
const formAddImage = document.forms.addImage;
const inputTitle = formAddImage.elements.title;
const inputLink = formAddImage.elements.link;

const popupZoomImage = document.querySelector('.popup_type_zoom-image');
const zoomImage = popupZoomImage.querySelector('.popup__zoom-image');
const zoomCaption = popupZoomImage.querySelector('.popup__zoom-caption');

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

// начальные картинки
const initialItems = [
  {
    name: 'Южный Урал',
    link: './images/south-ural-kurumnik.jpg'
  },
  {
    name: 'Териберка, Баренцово море',
    link: './images/teriberka.jpg'
  },
  {
    name: 'Алтай',
    link: './images/altai-mars.jpg'
  },
  {
    name: 'Карелия',
    link: './images/kareliya.jpg'
  },
  {
    name: 'Южный Урал',
    link: './images/south-ural.jpg'
  },
  {
    name: 'Алтай',
    link: './images/altai.jpg'
  }
];

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about'
});

const galeryList = new Section({
    items: initialItems,
    renderer: (item) => {
      const card = new Card(item, '#gallery-item-template', openPopupImage);
      const galeryItem = card.createCard();
      galeryList.addItem(galeryItem);
    }
  },
  '.gallery__list');

galeryList.renderItems();

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(1, 2);
  }
});

const popupAddImage = new PopupWithForm({
  popupSelector: '.popup_type_add-image',
  handleFormSubmit: (formData) => {}
});



// добавление начальных картинок
// initialItems.forEach(function (item) {
//   const galeryItem = createCard(item.name, item.link);
//   addCardInGalery(galeryItem);
// });

// создание картинок
// function createCard(name, link) {
//   const card = new Card({ name, link }, '#gallery-item-template', openPopupImage);
//   const galeryItem = card.createCard();
//   return galeryItem;
// }

// добавление картинок
// function addCardInGalery(item) {
//   galeryList.prepend(item);
// }

// функции работы с попап
// function openPopup(popup) {

// }

// function closePopup(popup) {

// }

// function closePopupByEsc(event) {

// }

function writeDataProfile() {
  // inputName.value = profileName.textContent;
  // inputAbout.value = profileAbout.textContent;
}

function saveDataProfile() {
  // profileName.textContent = inputName.value;
  // profileAbout.textContent = inputAbout.value;
}

// увеличение картинки
function openPopupImage(name, link) {
  openPopup(popupZoomImage);
  zoomImage.src = link;
  zoomImage.alt = name;
  zoomCaption.textContent = name;
}

// отправка формы
function submitFormEditProfile(event) {
  event.preventDefault(); // отмена стандартной отправки формы
  saveDataProfile();
  closePopup(event.target.closest('.popup'));
}

function submitFormAddImage(event) {
  event.preventDefault(); // отмена стандартной отправки формы
  const card = new Card({
      name: inputTitle.value,
      link: inputLink.value
    },
    '#gallery-item-template', openPopupImage);
  const galeryItem = card.createCard();
  galeryList.addItem(galeryItem);
  // const galeryItem = createCard(inputTitle.value, inputLink.value);
  // addCardInGalery(galeryItem);
  event.target.reset();
  closePopup(event.target.closest('.popup'));
}

buttonEdit.addEventListener('click', function () {
  popupEditProfile.open();
  userInfo.getUserInfo();
  // openPopup(popupEditProfile);
  formEditProfile.reset();
  formValidators['editProfile'].resetValidation();
  // writeDataProfile();
  setTimeout(() => {
    inputName.focus();
  }, 200);
});

buttonAdd.addEventListener('click', function () {
  openPopup(popupAddImage);
  formAddImage.reset();
  formValidators['addImage'].resetValidation();
  setTimeout(() => {
    inputTitle.focus();
  }, 200);
});

formEditProfile.addEventListener('submit', submitFormEditProfile);
formAddImage.addEventListener('submit', submitFormAddImage);

