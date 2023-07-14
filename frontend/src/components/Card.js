import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `picture__button ${isLiked && 'picture__button_active'}`
    );

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="picture">
            {isOwn && <button className="picture__basket" aria-label="Корзина для удаления фото" type="button" onClick={handleDeleteClick} />}
            <img src={card.link} alt={card.name} className="picture__image" onClick={handleClick} />
            <div className="picture__description">
                <h2 className="picture__name">{card.name}</h2>
                <div className="picture__like">
                    <button className={cardLikeButtonClassName} aria-label="Кнопка, отмечающая понравившееся фото" type="button" onClick={handleLikeClick} />
                    <span className="picture__likes">{card.likes.length}</span>
                </div>
            </div>
        </li>
    );
}

export default Card;