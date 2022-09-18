export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    fetch((this._baseUrl + '/users/me'), {
        headers: this._headers
      })
      .then(response => {
        if(response.ok && response.headers.get('Content-Type').contains('application/json')) {
          return response.json;
        } else {
          return Promise.reject(`Ошибка: ${response.status}`);
        }
      })
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(error => {
        console.log(error);
      });
  }

  getInitialCards() {
    fetch('https://mesto.nomoreparties.co/v1/cohortId/cards', {
        headers: this._headers
      })
      .then(response => {
        if(response.ok && response.headers.get('Content-Type').contains('application/json')) {
          return response.json;
        } else {
          return Promise.reject(`Ошибка: ${response.status}`);
        }
      })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }

  editUserInfo(name, about) {
    fetch((this._baseUrl + '/users/me'), {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
      .then(response => {
        if(response.ok && response.headers.get('Content-Type').contains('application/json')) {
          return response.json;
        } else {
          return Promise.reject(`Ошибка: ${response.status}`);
        }
      })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }

  addNewCard(name, link) {
    fetch((this._baseUrl + '/cards'), {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(response => {
        if(response.ok && response.headers.get('Content-Type').contains('application/json')) {
          return response.json;
        } else {
          return Promise.reject(`Ошибка: ${response.status}`);
        }
      })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
