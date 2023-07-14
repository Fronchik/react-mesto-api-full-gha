import checkYes from '../images/checkYes.svg';
import checkNo from '../images/checkNo.svg';

import React from 'react';

function InfoTooltip({ onClose, message, success }) {
    return (
        <section className="popup-info popup_opened">
            <div className="popup-info__content">
                <button className="popup-info__close-button" aria-label="Кнопка закрытия" type="button" onClick={() => onClose()}></button>
                <div className="popup-info__box">
                    <img src={success ? checkYes : checkNo} alt="картинка с галочкой" className="popup-info__image"></img>
                </div>
                <p className="popup-info__text">{message}</p>
            </div>
        </section>
    )
}

export default InfoTooltip;