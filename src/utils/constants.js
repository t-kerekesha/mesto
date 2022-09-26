// начальные картинки
const initialItems = [
  {
    name: 'Южный Урал',
    link: new URL('../images/south-ural-kurumnik.jpg', import.meta.url)
  },
  {
    name: 'Териберка, Баренцово море',
    link: new URL('../images/teriberka.jpg', import.meta.url)
  },
  {
    name: 'Алтай',
    link: new URL('../images/altai-mars.jpg', import.meta.url)
  },
  {
    name: 'Карелия',
    link: new URL('../images/kareliya.jpg', import.meta.url)
  },
  {
    name: 'Южный Урал',
    link: new URL('../images/south-ural.jpg', import.meta.url)
  },
  {
    name: 'Алтай',
    link: new URL('../images/altai.jpg', import.meta.url)
  }
];

const profile = document.querySelector('.profile');
export const buttonEdit = profile.querySelector('.profile__edit-button');
export const buttonAdd = profile.querySelector('.profile__add-button');
export const avatarEdit = profile.querySelector('.profile__avatar-overlay');

// параметры для валидации
export const validationParams = {
  inputClass: 'form__input',
  inputSelector: '.form__input',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_visible',
  submitButtonSelector: '.form__save-button'
};

export const formValidators = {};

// selectors
export const selectors = {
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar',

  containerSelector: '.gallery__list',
  templateSelector: '#gallery-item-template',

  popupEditProfileSelector: '.popup_type_edit-profile',
  popupAddImageSelector: '.popup_type_add-image',
  popupEditAvatarSelector: '.popup_type_edit-avatar',
  popupConfirmDeleteSelector: '.popup_type_confirm-delete',
  tooltipLikesSelector: '.tooltip-likes',

  popupZoomImageSelector: '.popup_type_zoom-image',
  popupImageSelector: '.popup__zoom-image',
  popupCaptionSelector: '.popup__zoom-caption'
};
