// const page = document.querySelector('.page');
const popup = document.querySelector('.popup');
const profile = document.querySelector('.profile');
const galeryList = document.querySelector('.gallery__list');
const closeButton = popup.querySelector('.popup__close-button');
const popupContainer = popup.querySelector('.popup__container');
const editButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');
let inputName = popup.querySelector('.popup__input_type_name');
let inputAbout = popup.querySelector('.popup__input_type_about');
const galleryItemTemplate = document.querySelector('#gallery-item-template').content;
let galeryItem;

// начальные картинки
const initialItems = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// добавление начальных картинок

initialItems.forEach(function(item) {
  galeryItem = galleryItemTemplate.cloneNode(true);
  galeryItem.querySelector('.gallery__image').src = item.link;
  galeryItem.querySelector('.gallery__caption').textContent = item.name;
  galeryItem.querySelector('.gallery__delete-button').addEventListener('click', deleteImageFromGallery);
  galeryItem.querySelector('.gallery__like-button').addEventListener('click', likeImage);
  galeryList.prepend(galeryItem);
});

// удаление картинок
function deleteImageFromGallery(event) {
  let item = event.target.closest('li');
  item.remove();
}

// лайк
function likeImage(event) {
  event.target.classList.toggle('gallery__like-button_active');
}

// функции работы с попап

function popupOpen() {
  popup.classList.add('popup_opened');
  writeDataPopup();
  inputName.focus();
}

function popupClose () {
  popup.classList.remove('popup_opened');
}

function writeDataPopup () {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault(); // отмена стандартной отправки формы
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  popupClose();
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
popupContainer.addEventListener('submit', formSubmitHandler);
