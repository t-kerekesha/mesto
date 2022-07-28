const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');

const galeryList = document.querySelector('.gallery__list');
const galleryItemTemplate = document.querySelector('#gallery-item-template').content;

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const inputName = popupEditProfile.querySelector('.popup__input_type_name');
const inputAbout = popupEditProfile.querySelector('.popup__input_type_about');

const popupAddImage = document.querySelector('.popup_type_add-image');
const inputTitle = popupAddImage.querySelector('.popup__input_type_name');
const inputLink = popupAddImage.querySelector('.popup__input_type_link');

const popupZoomImage = document.querySelector('.popup_type_zoom-image');
const zoomImage = popupZoomImage.querySelector('.popup__zoom-image');
const zoomCaption = popupZoomImage.querySelector('.popup__zoom-caption');

const popupContainers = document.querySelectorAll('.popup__container');
const closeButtons = document.querySelectorAll('.popup__close-button');

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
  let galeryItem = createImage(item.name, item.link);
  addImageInGalery(galeryItem);
});

// создание картинок
function createImage(name, link) {
  let galeryItem;
  galeryItem = galleryItemTemplate.querySelector('.gallery__list-item').cloneNode(true);
  galeryItem.querySelector('.gallery__image').src = link;
  galeryItem.querySelector('.gallery__image').alt = name;
  galeryItem.querySelector('.gallery__caption').textContent = name;
  galeryItem.querySelector('.gallery__delete-button').addEventListener('click', deleteImageFromGallery);
  galeryItem.querySelector('.gallery__like-button').addEventListener('click', likeImage);
  galeryItem.querySelector('.gallery__image').addEventListener('click', function() {
    zoomingImage(name, link);
  });
  return galeryItem;
}

// добавление картинок
function addImageInGalery(item) {
  galeryList.prepend(item);
}

// удаление картинок
function deleteImageFromGallery(event) {
  let item = event.target.closest('.gallery__list-item');
  item.remove();
}

// лайк
function likeImage(event) {
  event.target.classList.toggle('gallery__like-button_active');
}

// функции работы с попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function сlosePopupLostFocus(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
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
function zoomingImage(name, link) {
  openPopup(popupZoomImage);
  zoomImage.src = link;
  zoomImage.alt = name;
  zoomCaption.textContent = name;
}

editButton.addEventListener('click', function () {
  openPopup(popupEditProfile);
  writeDataProfile();
  inputName.focus();
});

addButton.addEventListener('click', function () {
  openPopup(popupAddImage);
  inputTitle.focus();
});

popupContainers.forEach(function (form) {
  form.addEventListener('submit', formSubmitHandler);
});

function formSubmitHandler(event) {
  event.preventDefault(); // отмена стандартной отправки формы
    if (event.target.closest('.popup') === popupEditProfile) {
      saveDataProfile();
    }
    else if (event.target.closest('.popup') === popupAddImage) {
      let galeryItem =createImage(inputTitle.value, inputLink.value);
      addImageInGalery(galeryItem);
      inputTitle.value = '';
      inputLink.value = '';
    }
    closePopup(event.target.closest('.popup'));
}

closeButtons.forEach(function (button) {
  button.addEventListener('click', function (event) {
    closePopup(event.target.closest('.popup'));
  });
});

popupEditProfile.addEventListener('click', сlosePopupLostFocus);
popupAddImage.addEventListener('click', сlosePopupLostFocus);
popupZoomImage.addEventListener('click', сlosePopupLostFocus);