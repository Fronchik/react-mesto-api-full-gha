const jwt = require('jsonwebtoken');
const Unauthorized = require('../components/Unauthorized');

// аутентификация пользователя на основе токена
const auth = (req, res, next) => {
  // токен из куки запроса
  const token = req.cookies.jwt;

  // проверка на отсутствие токена
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
