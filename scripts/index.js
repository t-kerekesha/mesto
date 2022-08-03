const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');

const galeryList = document.querySelector('.gallery__list');
const galleryItemTemplate = document.querySelector('#gallery-item-template').content;

const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = document.forms.editProfile;
const inputName = formEditProfile.elements.name;
const inputAbout = formEditProfile.elements.about;

const popupAddImage = document.querySelector('.popup_type_add-image');
const formAddImage = document.forms.addImage;
const inputTitle = formAddImage.elements.name;
const inputLink = formAddImage.elements.link;

const popupZoomImage = document.querySelector('.popup_type_zoom-image');
const zoomImage = popupZoomImage.querySelector('.popup__zoom-image');
const zoomCaption = popupZoomImage.querySelector('.popup__zoom-caption');


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
  const galeryItem = galleryItemTemplate.querySelector('.gallery__list-item').cloneNode(true);
  const image = galeryItem.querySelector('.gallery__image');
  const caption = galeryItem.querySelector('.gallery__caption');

  image.src = link;
  image.alt = name;
  caption.textContent = name;

  galeryItem.addEventListener('click', function(event) {
    if (event.target.classList.contains('gallery__delete-button')) {
      deleteImageFromGallery(galeryItem);
    }
    if (event.target.classList.contains('gallery__like-button')) {
      likeImage(event.target);
    }
    if (event.target.classList.contains('gallery__image')) {
      zoomingImage(name, link);
    }
  });
  return galeryItem;
}

// добавление картинок
function addImageInGalery(item) {
  galeryList.prepend(item);
}

// удаление картинок
function deleteImageFromGallery(item) {
  item.remove();
}

// лайк
function likeImage(likeItem) {
  likeItem.classList.toggle('gallery__like-button_active');
}

// функции работы с попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
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

popups.forEach(function (popup) {
  popup.addEventListener('mousedown', function(event) {
    if (event.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (event.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
  popup.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closePopup(popup);
    }
  });
});

editButton.addEventListener('click', function () {
  openPopup(popupEditProfile);
  writeDataProfile();
  inputName.focus();
});

addButton.addEventListener('click', function () {
  openPopup(popupAddImage);
  inputTitle.focus();
});

formEditProfile.addEventListener('submit', submitFormEditProfile);
formAddImage.addEventListener('submit', submitFormAddImage);

