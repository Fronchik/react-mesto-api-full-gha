import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState([]);
  const [description, setDescription] = React.useState([]);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function onNameChange(e) {
    setName(e.target.value);
  }

  function onDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm title="Редактировать профиль" name="profile" buttonText="Сохранить"
      isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input id="name" className="popup__input popup__input_name" name="name" type="text" value={name || ""} placeholder="Имя" minLength="2"
        maxLength="40" onChange={onNameChange} required />
      <span id="name-error" className="error"></span>
      <input id="description" className="popup__input popup__input_description" name="description" type="text" value={description || ""}
        placeholder="О себе" minLength="2" maxLength="200" onChange={onDescriptionChange} required />
      <span id="description-error" className="error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;