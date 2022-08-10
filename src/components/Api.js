class Api {

  constructor({baseUrl, token}) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  // Получение данных юзера
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
  // Получение начальных карт с сервера
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

  // Обновить данные о пользователе
  updateUserData({name, description}) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${name}`,
        about: `${description}`
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
  // Обновить аватар пользователя
  updateUserAvatar({url}) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: `${url}`
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
  // Добавить новую карточку
  addNewCard({name, link}) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
  // Удалить карточку
  deleteCard(idDeletedCard) {
    this._cardId = idDeletedCard;
    return fetch(`${this._baseUrl}cards/${this._cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
  // Поставить лайк
  likeCard(cardId) {
    this._cardId = cardId;
    return fetch(`${this._baseUrl}cards/${this._cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  // Снять лайк
  deleteLikeCard(cardId) {
    this._cardId = cardId;
    return fetch(`${this._baseUrl}cards/${this._cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

}

const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46/',
  token: '99d4074a-8cff-4dcb-bc43-c6fec3e71a0e'
};

export {Api, apiConfig}
