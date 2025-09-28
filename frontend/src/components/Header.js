import headerLogo from '../images/Mesto.svg';
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';

function Header({ email, loggedIn, onSignOut }) {
    return (
        <header className="header">
            <img src={headerLogo} alt="Логотип Место России" className="logo logo_place_header" />
            <Routes>
                <Route path="/sign-in" element={<Link to="/sign-up" className="popup-login__enter" aria-label="Кнопка регистрации" type="submit">Регистрация</Link>} />
                <Route path="/sign-up" element={<Link to="/sign-in" className="popup-login__enter" aria-label="Кнопка входа" type="submit">Войти</Link>} />
            </Routes>
            {loggedIn && <div class="popup-login__box">
                <div class="popup-login__box-mail">
                    <Link to="/" className="popup-login__enter" aria-label="Электронная почта" type="submit">{email} </Link>
                </div>
                <div class="popup-login__box-enter">
                    <button onClick={onSignOut} className="popup-login__enter" aria-label="Кнопка выхода" type="button">Выйти</button>
                </div>
            </div>
            }
        </header>
    );
}

export default Header;
