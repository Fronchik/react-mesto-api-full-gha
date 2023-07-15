import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { api } from '../utils/Api';
import { auth } from '../utils/Auth.js';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [showInfoTooltip, setShowInfoTooltip] = React.useState(false);
  const [infoToolTipData, setInfoToolTipData] = React.useState({ text: '', status: false })
  const [myEmail, setMyEmail] = React.useState(null);
  const [tokenChecked, setTokenChecked] = React.useState(false);
  const navigate = useNavigate();

  function checkToken(token) {
    auth.checkToken(token)
      .then((result) => {
        setLoggedIn(true);
        setTokenChecked(true);
        setMyEmail(result.data.email);
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
        setTokenChecked(true);
      });
  }

  React.useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => {
          console.log(err);
        });
      api.getProfileInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn])

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoggedIn(false);
      setTokenChecked(true);
      return
    }
    checkToken(token);
  }, [])

  // регистрация пользователя
  function handleRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        setShowInfoTooltip(true);
        setInfoToolTipData({
          "text": "Вы успешно зарегистрировались!",
          "status": true
        })
        navigate("/sign-in");
      })
      .catch((err) => {
        setShowInfoTooltip(true);
        setInfoToolTipData({
          "text": "Что-то пошло не так! Попробуйте ещё раз.",
          "status": false
        })
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    auth.login(email, password)
      .then((result) => {
        localStorage.setItem("token", result.token);
        setLoggedIn(true);
        setMyEmail(email);
        setTokenChecked(true);
        navigate("/");
      })
      .catch((err) => {
        setShowInfoTooltip(true);
        setInfoToolTipData({
          "text": "Что-то пошло не так! Попробуйте ещё раз.",
          "status": false
        })
        console.log(err);
      });
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setTokenChecked(false);
    navigate('/sign-in');
  }

  function handleCardLike(card) {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser({ name, about }) {
    // Загрузка информации о пользователе с сервера
    api.setUserInfo(name, about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api.updateUserAvatar(avatar)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(name, link) {
    api.addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setShowInfoTooltip(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={myEmail} loggedIn={loggedIn} onSignOut={handleSignOut} />

        <Routes>
          <Route path="/" element={
            <ProtectedRoute
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={setSelectedCard}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              element={Main}
              loggedIn={loggedIn || !tokenChecked}
            />}
          />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
        </Routes>

        <Footer />

        {showInfoTooltip && <InfoTooltip onClose={closeAllPopups} success={infoToolTipData.status} message={infoToolTipData.text} />}

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <PopupWithForm title="Вы уверены?" buttonText="Да" />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
