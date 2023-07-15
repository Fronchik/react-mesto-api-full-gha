const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');
const UserNotFound = require('../components/UserNotFound');
const Unauthorized = require('../components/Unauthorized');
const CardNotFound = require('../components/CardNotFound');
const Conflict = require('../components/Conflict');
const BadRequest = require('../components/BadRequest');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users)).catch(next);
};

const getUsersMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new UserNotFound();
      }
      res.status(200).send(user);
    }).catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new UserNotFound();
      }
      res.status(200).send(user);
    }).catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(String(req.body.password), 10)
    .then((hashedPassword) => {
      User.create({ ...req.body, password: hashedPassword })
        .then((user) => res.status(201).send(user))
        .catch((err) => {
          // Проверяем, является ли ошибка ошибкой валидации
          if (err.name === 'ValidationError') {
            next(new BadRequest());
          } else if (err.code === 11000) {
            next(new Conflict());
          } else {
            next(err);
          }
        });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  // проверяем существует ли пользователь с таким email
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized();
      }
      // проверяем совпадает ли пароль
      bcrypt.compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const { NODE_ENV, JWT_SECRET } = process.env;
            // создать JWT token
            const token = jsonWebToken.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
            res.send({ data: user.toJSON(), token });
          } else {
            throw new Unauthorized();
          }
        }).catch(next);
    }).catch(next);
};

const updateProfileUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new UserNotFound();
      }
      res.status(200).send(user);
    }).catch((err) => {
      // Проверяем, является ли ошибка ошибкой валидации
      if (err.name === 'ValidationError') {
        next(new BadRequest());
      } else {
        next(err);
      }
    });
};

const updateAvatarUser = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (user && user.avatar === avatar) {
        res.status(200).send(user);
      } else {
        throw new CardNotFound();
      }
    })
    .catch((err) => {
      // Проверяем, является ли ошибка ошибкой валидации
      if (err.name === 'ValidationError') {
        next(new BadRequest());
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  getUsersMe,
  createUser,
  updateProfileUser,
  updateAvatarUser,
  login,
};
