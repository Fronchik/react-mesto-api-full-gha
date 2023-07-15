const jwt = require('jsonwebtoken');
const Unauthorized = require('../components/Unauthorized');

// аутентификация пользователя на основе токена
const auth = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  // проверка на отсутствие токена
  if (!bearerToken || !bearerToken.startsWith('Bearer')) {
    throw new Unauthorized();
  }
  const token = bearerToken.replace('Bearer', '');
  if (!token) {
    throw new Unauthorized();
  }

  // храниться расшифрованная информация из токена
  let payload;

  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    const error = new Unauthorized();
    next(error);
    return;
  }

  req.user = payload;
  next();
};

module.exports = auth;
