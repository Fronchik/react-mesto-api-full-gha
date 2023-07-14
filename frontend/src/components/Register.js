import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
    const emailRef = React.useRef();
    const passwordRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(emailRef.current.value, passwordRef.current.value);
    }

    return (
        <section className="popup-login">
            <div className="popup-login__content">
                {/* <button class="popup-login__enter" aria-label="Кнопка входа" type="submit">Вход</button> */}
                <h2 className="popup-login__title">Регистрация</h2>
                <form id="login-form" className="popup-login__form" name="login-form" onSubmit={handleSubmit}>
                    <input id="email" ref={emailRef} className="popup-login__input" name="login" type="text" placeholder="Email" required></input>
                    <input id="password" ref={passwordRef} className="popup-login__input" name="password" type="password" placeholder="Пароль" required></input>
                    <button className="popup-login__save" aria-label="Кнопка входа" type="submit">Зарегистрироваться</button>
                    <Link to="/sign-in" className="popup-login__check" aria-label="Кнопка входа" type="submit">Уже зарегистрированы? Войти</Link>
                </form>
            </div>
        </section>
    )
}

export default Register;