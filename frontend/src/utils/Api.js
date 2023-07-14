class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // метод запроса с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  // Загрузка информации о пользователе с сервера
  getProfileInfo() {
    return this._request(this.baseUrl + '/users/me', {
      headers: this.headers
    });
  }

  //  Загрузка карточек с сервера
  getInitialCards() {
    return this._request(this.baseUrl + '/cards', {
      headers: this.headers
    });
  }

  // Редактирование профиля
  setUserInfo(name, about) {
    return this._request(this.baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name, about
      })
    })
  }

  // Добавление новой карточки
  addNewCard(name, link) {
    return this._request(this.baseUrl + '/cards', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name, link
      })
    })
  }

  // Удаление карточки
  deleteCard(cardId) {
    return this._request(this.baseUrl + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
  }

  // Постановка лайка
  changeLikeCardStatus(cardId, isLiked) {
    return this._request(this.baseUrl + `/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this.headers,
    })
  }

  // Обновление аватара пользователя
  updateUserAvatar(avatar) {
    return this._request(this.baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(avatar)
    })
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: '13dd71e2-a4cb-4a97-bac3-d4ec058f8440',
    'Content-Type': 'application/json'
  }
});