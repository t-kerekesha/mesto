const page = document.querySelector('.page');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const saveButton = popup.querySelector('.popup__save-button');
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');
let inputName = popup.querySelector('.popup__input_type_name');
let inputAbout = popup.querySelector('.popup__input_type_about');

function popupOpen() {
  popup.classList.add('popup_opened');
  writeDataPopup();
  inputName.focus();
  page.style.overflowY = 'hidden'; //убрать прокрутку страницы
}

function popupClose () {
  popup.classList.remove('popup_opened');
  page.style.overflowY = '';
}

function popupCloseLostFocus(event) {
  if (event.target === event.currentTarget) {
    popupClose();
  }
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
popup.addEventListener('click', popupCloseLostFocus);
popup.addEventListener('submit', formSubmitHandler);
popup.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    popupClose();
  }
});


