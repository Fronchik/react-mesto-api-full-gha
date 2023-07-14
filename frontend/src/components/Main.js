import React from 'react';
import profilePlus from '../images/Plus.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__description">
                    <button className="profile__avatar-button" aria-label="Кнопка редактирования" type="button" onClick={onEditAvatar}>
                        <img src={currentUser.avatar} alt="Фото Жак-Ив Кусто" className="profile__image" />
                    </button>
                    <div className="profile__info">
                        <div className="profile__main">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button
                                className="profile__edit-button"
                                aria-label="Кнопка редактирования"
                                type="button"
                                onClick={onEditProfile}>
                            </button>
                        </div>
                        <p className="profile__text">{currentUser.about}</p>
                    </div>
                    <button className="profile__add-button" aria-label="Кнопка Добавить" type="button" onClick={onAddPlace}>
                        <img src={profilePlus} alt="Кнопка с Плюсом" className="profile__plus" />
                    </button>
                </div>
            </section>
            <section className="pictures">
                <ul className="pictures__list">
                    {cards.map((card) => (
                        <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;