import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { login } from "../../../store/auth/actions";

export const FormLogin = () => {
    const statusMesg = useSelector((state) => state.status.statusMsg);

    const [loginInput, setLogin] = useState({
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    const history = useHistory();
    const handleInput = (e) => {
        e.persist();

        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        };
        dispatch(login(data));
    };

    return (
        <>
            <div className="form-authorizate">
                <div className="block-center">
                    <div className="title">
                        <img
                            className="mb-4 logo"
                            src="/image/logo.png"
                            alt=""
                        />
                        <h1 className="h1-title mb-3  text-center">
                            Вход в GBChat
                        </h1>
                        <h3 className="h3-title mb-3  text-center">
                            Какой-нибудь необычный слоган для пользователя.
                        </h3>
                    </div>
                    <Form
                        className="form-signin form-floating pb-4"
                        onSubmit={handleLogin}
                    >
                        <div className="input-block">
                            <div className="form-floating pb-3">
                                <input
                                    value={loginInput.email}
                                    name="email"
                                    type="text"
                                    className="form-control input"
                                    id="email"
                                    placeholder="Укажите ваш email"
                                    onChange={handleInput}
                                    required
                                />
                                <label htmlFor="email">
                                    Введите ваш e-mail
                                </label>
                                {statusMesg.email ? (
                                    <div
                                        className="alert alert-danger d-flex align-items-center"
                                        role="alert"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                                            viewBox="0 0 16 16"
                                            role="img"
                                            aria-label="Danger:"
                                        >
                                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                        </svg>
                                        <div>{statusMesg.email}</div>
                                    </div>
                                ) : null}
                            </div>

                            <div className="form-floating pb-">
                                <input
                                    value={loginInput.password}
                                    type="password"
                                    name="password"
                                    className="form-control input"
                                    id="floatingPassword"
                                    placeholder="Password"
                                    onChange={handleInput}
                                    required
                                />
                                <label htmlFor="floatingPassword">
                                    Введите пароль
                                </label>
                            </div>
                            {statusMesg.password ? (
                                <div
                                    className="alert alert-danger d-flex align-items-center"
                                    role="alert"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                                        viewBox="0 0 16 16"
                                        role="img"
                                        aria-label="Danger:"
                                    >
                                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                    </svg>
                                    <div>{statusMesg.password}</div>
                                </div>
                            ) : null}
                        </div>

                        <div className="checkbox mb-3">
                            <label className="px-3">
                                <input type="checkbox" value="remember-me" />{" "}
                                Запомнить меня
                            </label>
                            <label className="px-3">
                                <Link to="/reset" className="a-text">
                                    Забыли пароль?
                                </Link>
                            </label>
                        </div>

                        <button
                            className="btn btn-lg btn-success"
                            type="submit"
                        >
                            Войти
                        </button>
                    </Form>
                </div>

                <div className="bottom-text">
                    <span className="px-3">У вас еще нет учетной записи?</span>

                    <Link to="/register" className="a-text">
                        Регистрация
                    </Link>
                </div>
            </div>
        </>
    );
};
