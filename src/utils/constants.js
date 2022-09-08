// пути картинок
const uralImage = new URL('../images/south-ural-kurumnik.jpg', import.meta.url);
const teriberkaImage = new URL('../images/teriberka.jpg', import.meta.url);
const altaiMarsImage = new URL('../images/altai-mars.jpg', import.meta.url);
const kareliyaImage = new URL('../images/kareliya.jpg', import.meta.url);
const southUralImage = new URL('../images/south-ural.jpg', import.meta.url);
const altaiImage = new URL('../images/altai.jpg', import.meta.url);

// начальные картинки
export const initialItems = [
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

const profile = document.querySelector('.profile');
export const buttonEdit = profile.querySelector('.profile__edit-button');
export const buttonAdd = profile.querySelector('.profile__add-button');

// параметры для валидации
export const validationParams = {
  inputClass: 'form__input',
  inputSelector: '.form__input',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_visible',
  submitButtonSelector: '.form__save-button'
};

export const formValidators = {};
