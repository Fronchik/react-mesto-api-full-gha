const HTTPError = require('./HTTPError');

class UserNotFound extends HTTPError {
  constructor() {
    super('Пользователь не найден', 404);
  }
}

module.exports = UserNotFound;
