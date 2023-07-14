const HTTPError = require('./HTTPError');

class CardNotFound extends HTTPError {
  constructor() {
    super('Карточка не найдена', 404);
  }
}

module.exports = CardNotFound;
