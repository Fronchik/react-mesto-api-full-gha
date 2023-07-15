const Card = require('../models/card');
const NotFound = require('../components/NotFound');
const Forbidden = require('../components/Forbidden');
const BadRequest = require('../components/BadRequest');

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      // Проверяем, является ли ошибка ошибкой валидации
      if (err.name === 'ValidationError') {
        next(new BadRequest());
      } else {
        next(err);
      }
    });
};

const deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((cardToDelete) => {
      if (!cardToDelete) {
        throw new NotFound();
      }
      if (String(cardToDelete.owner) !== String(req.user._id)) {
        throw new Forbidden();
      }
      cardToDelete.deleteOne()
        .then(() => {
          res.status(200).send({ message: 'Card deleted successfully' });
        }).catch(next);
    })
    .catch(next);
};

const putLikeCardById = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        throw new NotFound();
      } else {
        res.status(200).send(card);
      }
    })
    .catch(next);
};

const deleteLikeCardById = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound();
      } else {
        res.status(200).send(card);
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  putLikeCardById,
  deleteLikeCardById,
};
