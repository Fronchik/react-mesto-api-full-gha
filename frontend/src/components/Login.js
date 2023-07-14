import React from 'react';

function Login({ onLogin }) {
    const emailRef = React.useRef();
    const passwordRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(emailRef.current.value, passwordRef.current.value);
    }

    return (
        <section className="popup-login">
            <div className="popup-login__content">
                <h2 className="popup-login__title">Вход</h2>
                <form id="login-form" className="popup-login__form" name="login-form" onSubmit={handleSubmit}>
                    <input id="email" ref={emailRef} className="popup-login__input" name="login" type="email" placeholder="Email" required></input>
                    <input id="password" ref={passwordRef} className="popup-login__input" name="password" type="password" placeholder="Пароль" required></input>
                    <button className="popup-login__save" aria-label="Кнопка входа" type="submit">Войти</button>
                </form>
            </div>
        </section>
    )
}

export default Login;