function ImagePopup({ card, onClose }) {
    if (!card) {
        return null;
    }

    return (
        <section className={`popup preview-popup popup_dark ${card ? "popup_opened" : ''}`}>
            <div className="preview">
                <figure className="preview__photo">
                    <button className="popup__close-button" aria-label="Кнопка закрытия" type="button" onClick={() => onClose()}></button>
                    <img src={card.link} alt={card.name} className="preview__image" />
                    <figcaption className="preview__name"></figcaption>
                </figure>
            </div>
        </section>
    );
}

export default ImagePopup;