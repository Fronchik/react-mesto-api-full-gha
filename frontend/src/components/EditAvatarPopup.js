import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = React.useRef();

    React.useEffect(() => {
        avatarRef.current.value = "";
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm title="Обновить аватар" name="avatar" buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input id="avatar" ref={avatarRef} className="popup__input popup__input_description" name="link" type="url" required />
            <span id="avatar-error" className="error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;