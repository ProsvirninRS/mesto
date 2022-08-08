class Api {

  constructor({baseUrl, token}) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  getInitialProfile() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        authorization: `${this._token}`
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: {
        authorization: `${this._token}`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
          return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  patchProfile(name, about) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  }


}

  // другие методы работы с API

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46',
  headers: {
    authorization: '99d4074a-8cff-4dcb-bc43-c6fec3e71a0e',
    'Content-Type': 'application/json'
  }
});

const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46/',
  token: '99d4074a-8cff-4dcb-bc43-c6fec3e71a0e'
};


export {Api, apiConfig}
