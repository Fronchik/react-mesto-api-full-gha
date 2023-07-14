import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const nameRef = React.useRef();
    const linkRef = React.useRef();
    React.useEffect(() => {
        nameRef.current.value = "";
        linkRef.current.value = "";
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace(nameRef.current.value, linkRef.current.value);
    }

    return (
        <PopupWithForm title="Новое место" name="card" buttonText="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input id="name-title" ref={nameRef} className="popup__input popup__input_name" name="name" type="text" placeholder="Название"
                minLength="2" maxLength="30" required />
            <span id="name-title-error" className="error"></span>
            <input id="link" ref={linkRef} className="popup__input popup__input_description" name="link" type="url"
                placeholder="Ссылка на картинку" required />
            <span id="link-error" className="error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;