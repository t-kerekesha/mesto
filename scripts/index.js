const page = document.querySelector('.page');
const popup = document.querySelector('.popup');
const profile = document.querySelector('.profile');
const closeButton = popup.querySelector('.popup__close-button');
const saveButton = popup.querySelector('.popup__save-button');
const popupContainer = popup.querySelector('.popup__container');
const editButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');
let inputName = popup.querySelector('.popup__input_type_name');
let inputAbout = popup.querySelector('.popup__input_type_about');

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



