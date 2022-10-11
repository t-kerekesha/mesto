export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getAllInfo() {
    return Promise.all([ this.getUserInfo(), this.getInitialCards() ]);
  }

  getUserInfo() {
    return fetch((this._baseUrl + '/users/me'), {
      headers: this._headers
    })
    .then((response) => {
      return this._checkResponse(response);
    });
  }

  getInitialCards() {
    return fetch((this._baseUrl + '/cards'), {
      headers: this._headers
    })
    .then((response) => {
      return this._checkResponse(response);
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
      return this._checkResponse(response);
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
      return this._checkResponse(response);
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
      return this._checkResponse(response);
    });
  }

  deleteCard(cardId) {
    return fetch((this._baseUrl + '/cards/' + cardId), {
      method: 'DELETE',
      headers: this._headers
    })
    .then((response) => {
      return this._checkResponse(response);
    });
  }

  likeCard(cardId, like) {
    const method = (like)? 'PUT' : 'DELETE';
    return fetch((this._baseUrl + '/cards/' + cardId + '/likes'), {
      method: method,
      headers: this._headers
    })
    .then((response) => {
      return this._checkResponse(response);
    });
  }

  _checkResponse(response) {
    if(response.ok) {
      return response.json();
    } else {
      return Promise.reject({ message: `Ошибка: ${response.status}` });
    }
  }
}
