function PopupWithForm({ title, name, isOpen, onClose, buttonText, children, onSubmit }) {
    return (
        <section className={`popup ${name}-popup` + (isOpen ? " popup_opened" : "")}>
            <div className="popup__content">
                <button className="popup__close-button" aria-label="Кнопка закрытия" type="button" onClick={() => onClose()}></button>
                <h2 className="popup__title">{title}</h2>
                <form id="profile-form" className="popup__form" name="profile-form" onSubmit={onSubmit}>
                    {children}
                    <button className="popup__save" aria-label="Кнопка сохранения" type="submit">{buttonText}</button>
                </form>
            </div>
        </section>
    );
}

export default PopupWithForm;