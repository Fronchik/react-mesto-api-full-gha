const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const {
  getCards, createCard, deleteCardById, putLikeCardById, deleteLikeCardById,
} = require('../controllers/cards');

// возвращает все карточки
router.get('/', getCards);

// создаёт карточку
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().pattern(/^https?:\/\/(?:www\.)?[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*(?::\d+)?(?:\/[^\s/]+)*(?:\/[^\s]*)?$/).required(),
  }),
}), createCard);

// удаляет карточку по идентификатору
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId().required(),
  }),
}), deleteCardById);

// поставить лайк карточке
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId().required(),
  }),
}), putLikeCardById);

// убрать лайк с карточки
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId().required(),
  }),
}), deleteLikeCardById);

module.exports = router;
