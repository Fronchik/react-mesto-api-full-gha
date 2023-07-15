const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlwares/auth');
const UserNotFound = require('../components/UserNotFound');

const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// router.post('/signin', login);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

// router.post('/signup', createUser);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().default('Жак-Ив Кусто').min(2).max(30),
    about: Joi.string().default('Исследователь').min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    avatar: Joi.string().pattern(/^https?:\/\/(?:www\.)?[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*(?::\d+)?(?:\/[^\s/]+)*(?:\/[^\s]*)?$/),
  }),
}), createUser);

router.use(auth);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('*', (req, res, next) => {
  next(new UserNotFound());
});

module.exports = router;
