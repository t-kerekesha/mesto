const page = document.querySelector('.page');
const popup = document.querySelector('.popup');
const profile = document.querySelector('.profile');
const closeButton = popup.querySelector('.popup__close-button');
const saveButton = popup.querySelector('.popup__save-button');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');
let inputName = popup.querySelector('.popup__input_type_name');
let inputAbout = popup.querySelector('.popup__input_type_about');
const galeryList = document.querySelector('.galery__list');

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

function addImageInGalery () {
  galeryList.insertAdjacentHTML('beforeend', `
    <li>
      <figure class="galery__container">
        <div class="galery__aspect-ratio">
          <img src="./images/dombay.jpg" alt="Домбай" class="galery__image">
        </div>
        <figcaption class="galery__container-caption">
          <h2 class="galery__caption">Домбай</h2>
          <button class="galery__like-button"></button>
        </figcaption>
      </figure>
    </li>
  `);
} // заготовка для вставки

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
popup.addEventListener('click', popupCloseLostFocus);
popup.addEventListener('submit', formSubmitHandler);
popup.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    popupClose();
  }
});

addButton.addEventListener('click', addImageInGalery);


