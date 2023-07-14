const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const {
  getUsers, getUserById, getUsersMe, updateProfileUser, updateAvatarUser,
} = require('../controllers/users');

// возвращает всех пользователей
router.get('/', getUsers);

// возвращает информацию о текущем пользователе
router.get('/me', getUsersMe);

// возвращает пользователя по _id
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.objectId().required(),
  }),
}), getUserById);

// обновляет профиль
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfileUser);

// обновляет аватар
router.patch('/me/avatar', celebrate({
  body: Joi.object({
    avatar: Joi.string().pattern(/^https?:\/\/(?:www\.)?[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=]+$/).required(),
  }),
}), updateAvatarUser);

module.exports = router;
