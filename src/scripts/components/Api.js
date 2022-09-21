export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch((this._baseUrl + '/users/me'), {
      headers: this._headers
    })
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getInitialCards() {
    return fetch((this._baseUrl + '/cards'), {
      headers: this._headers
    })
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  editUserInfo({ name, about }) {
    return fetch((this._baseUrl + '/users/me'), {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  editUserAvatar(linkAvatar) {
    return fetch((this._baseUrl + '/users/me/avatar'), {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: linkAvatar
      })
    })
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  addNewCard({ name, link }) {
    return fetch((this._baseUrl + '/cards'), {
      method: 'POST',
       headers: this._headers,
       body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  deleteCard(cardId) {
    return fetch((this._baseUrl + '/cards/' + cardId), {
      method: 'DELETE',
      headers: this._headers
    })
    .then((response) => {
      if(response.ok) {
        return response;
      } else {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  likeCard(cardId, like) {
    const method = (like)? 'PUT' : 'DELETE';
    return fetch((this._baseUrl + '/cards/' + cardId + '/likes'), {
      method: method,
      headers: this._headers
    })
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
