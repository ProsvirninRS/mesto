class Api {

  constructor({baseUrl, token, contentType}) {
    this._baseUrl = baseUrl;
    this._token = token;
    this._contentType = contentType;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

  // Получение данных юзера
  getInitialProfile() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        authorization: `${this._token}`
      }
    })
      .then((res) => {
       return this._getResponseData(res);
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
        return this._getResponseData(res);
      })
  }

  // Обновить данные о пользователе
  updateUserData({name, description}) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': `${this._contentType}`,
      },
      body: JSON.stringify({
        name: `${name}`,
        about: `${description}`
      })
    })
    .then(res => {
      return this._getResponseData(res);
    })
  }
  // Обновить аватар пользователя
  updateUserAvatar({url}) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': `${this._contentType}`,
      },
      body: JSON.stringify({
        avatar: `${url}`
      })
    })
    .then(res => {
      return this._getResponseData(res);
    })
  }
  // Добавить новую карточку
  addNewCard({name, link}) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': `${this._contentType}`,
      },
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`
      })
    })
    .then(res => {
      return this._getResponseData(res);
    })
  }
  // Удалить карточку
  deleteCard(idDeletedCard) {
    this._cardId = idDeletedCard;
    return fetch(`${this._baseUrl}cards/${this._cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': `${this._contentType}`,
      },
    })
    .then(res => {
      return this._getResponseData(res);
    })
  }
  // Поставить лайк
  likeCard(cardId) {
    this._cardId = cardId;
    return fetch(`${this._baseUrl}cards/${this._cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': `${this._contentType}`,
      },
    })
    .then(res => {
      return this._getResponseData(res);
    })
  }

  // Снять лайк
  deleteLikeCard(cardId) {
    this._cardId = cardId;
    return fetch(`${this._baseUrl}cards/${this._cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': `${this._contentType}`,
      },
    })
    .then(res => {
      return this._getResponseData(res);
    })
  }
}

export {Api}
