class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
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

  _headers() {
    return {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  }

  // Загрузка информации о пользователе с сервера
  getProfileInfo() {
    return this._request(this.baseUrl + '/users/me', {
      headers: this._headers()
    });
  }

  //  Загрузка карточек с сервера
  getInitialCards() {
    return this._request(this.baseUrl + '/cards', {
      headers: this._headers()
    });
  }

  // Редактирование профиля
  setUserInfo(name, about) {
    return this._request(this.baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers(),
      body: JSON.stringify({
        name, about
      })
    })
  }

  // Добавление новой карточки
  addNewCard(name, link) {
    return this._request(this.baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify({
        name, link
      })
    })
  }

  // Удаление карточки
  deleteCard(cardId) {
    return this._request(this.baseUrl + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers(),
    })
  }

  // Постановка лайка
  changeLikeCardStatus(cardId, isLiked) {
    return this._request(this.baseUrl + `/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers(),
    })
  }

  // Обновление аватара пользователя
  updateUserAvatar(avatar) {
    return this._request(this.baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers(),
      body: JSON.stringify(avatar)
    })
  }
}

export const api = new Api(process.env.REACT_APP_API_URL || 'https://api.mesto.fronchik.com');
