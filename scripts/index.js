import Card from './Card.js';
import FormValidator from './FormValidator.js';

const profile = document.querySelector('.profile');
const buttonEdit = profile.querySelector('.profile__edit-button');
const buttonAdd = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');

const galeryList = document.querySelector('.gallery__list');

const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = document.forms.editProfile;
const inputName = formEditProfile.elements.name;
const inputAbout = formEditProfile.elements.about;

const popupAddImage = document.querySelector('.popup_type_add-image');
const formAddImage = document.forms.addImage;
const inputTitle = formAddImage.elements.title;
const inputLink = formAddImage.elements.link;

const popupZoomImage = document.querySelector('.popup_type_zoom-image');
const zoomImage = popupZoomImage.querySelector('.popup__zoom-image');
const zoomCaption = popupZoomImage.querySelector('.popup__zoom-caption');

const formValidatorEditProfile = new FormValidator({
    inputClass: 'form__input',
    inputSelector: '.form__input',
    inputErrorClass: 'form__input_invalid',
    errorClass: 'form__input-error_visible',
    submitButtonSelector: '.form__save-button'
  },
  formEditProfile);
formValidatorEditProfile.enableValidation();

const formValidatorAddImage = new FormValidator({
    inputClass: 'form__input',
    inputSelector: '.form__input',
    inputErrorClass: 'form__input_invalid',
    errorClass: 'form__input-error_visible',
    submitButtonSelector: '.form__save-button'
  },
  formAddImage);
formValidatorAddImage.enableValidation();

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

// добавление начальных картинок
initialItems.forEach(function (item) {
  const galeryItem = createImage(item.name, item.link);
  addImageInGalery(galeryItem);
});

// создание картинок
function createImage(name, link) {
  const card = new Card({ name, link }, '#gallery-item-template');
  const galeryItem = card.createCard();
  return galeryItem;
}

// добавление картинок
function addImageInGalery(item) {
  galeryList.prepend(item);
}

// функции работы с попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByEsc(event) {
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function writeDataProfile() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

function saveDataProfile() {
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
}

// увеличение картинки
export function openPopupImage(name, link) {
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
  const galeryItem = createImage(inputTitle.value, inputLink.value);
  addImageInGalery(galeryItem);
  event.target.reset();
  closePopup(event.target.closest('.popup'));
}


// сброс формы и валидационных сообщений
function resetForm(form) {
  form.reset();
  const errors = form.querySelectorAll('.form__input-error');
  errors.forEach(function(error) {
    error.textContent = '';
    error.classList.remove('form__input-error_visible');
  });
  const inputs = form.querySelectorAll('.form__input');
  inputs.forEach(function(input) {
    input.classList.remove('form__input_invalid');
  });
}

function setFocusAtEndTransition(event) {
  event.currentTarget.querySelector('.form__input').focus();
  this.removeEventListener('transitionend', setFocusAtEndTransition);
}

popups.forEach(function (popup) {
  popup.addEventListener('mousedown', function(event) {
    if (event.target.classList.contains('popup_opened') ||
        event.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

buttonEdit.addEventListener('click', function () {
  openPopup(popupEditProfile);
  popupEditProfile.addEventListener('transitionend', setFocusAtEndTransition);
  resetForm(formEditProfile);
  const button = formEditProfile.querySelector('.form__save-button');
  formValidatorEditProfile.setDisabledStateButton(button, false);
  writeDataProfile();
  inputName.focus();
});

buttonAdd.addEventListener('click', function () {
  openPopup(popupAddImage);
  popupAddImage.addEventListener('transitionend', setFocusAtEndTransition);
  resetForm(formAddImage);
  const button = formAddImage.querySelector('.form__save-button');
  formValidatorAddImage.setDisabledStateButton(button, true);
  inputTitle.focus();
});

formEditProfile.addEventListener('submit', submitFormEditProfile);
formAddImage.addEventListener('submit', submitFormAddImage);
