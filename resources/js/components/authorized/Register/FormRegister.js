import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router";
import { register } from "../../../store/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FloatingLabel, Form, Button } from "react-bootstrap";

export const FormRegister = () => {
    const [registerInput, setRegister] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        error_list: [],
    });
    const history = useHistory();
    const status = useSelector((state) => state.status.statusMsg);

    const dispatch = useDispatch();
    const handleChange = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            password_confirmation: registerInput.password_confirmation,
        };

        dispatch(register(data));
        history.push("/login");
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
                            Регистрация
                        </h1>
                        <h3 className="h3-title mb-3  text-center">
                            Какой-нибудь необычный слоган для пользователя.
                        </h3>
                    </div>
                    <Form
                        className="form-signin form-floating pb-4"
                        onSubmit={handleRegister}
                    >
                        <FloatingLabel className="mb-3">
                            <Form.Control
                                className="input"
                                value={registerInput.name}
                                name="name"
                                type="text"
                                id="name"
                                placeholder="Введите имя"
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="name">Введите имя</label>
                        </FloatingLabel>
                        <FloatingLabel className="mb-3">
                            <Form.Control
                                value={registerInput.email}
                                name="email"
                                type="email"
                                className="form-control input"
                                id="email"
                                placeholder="name@example.com"
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="name">Введите ваш email</label>
                            {status.email ? (
                                <div
                                    className="alert alert-danger d-flex align-items-center"
                                    role="alert"
                                >
                                    <svg
                                        className="bi flex-shrink-0 me-2"
                                        width="12"
                                        height="12"
                                        role="img"
                                        aria-label="Danger:"
                                    >
                                        <symbol
                                            id="exclamation-triangle-fill"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                        </symbol>
                                    </svg>
                                    <div>{status.email}</div>
                                </div>
                            ) : null}
                        </FloatingLabel>
                        <FloatingLabel className="mb-3">
                            <Form.Control
                                type="password"
                                name="password"
                                className="form-control input"
                                id="password"
                                placeholder="Пароль"
                                value={registerInput.password}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="password">Введите пароль</label>
                            {status.password ? (
                                <div
                                    className="alert alert-danger d-flex align-items-center"
                                    role="alert"
                                >
                                    <svg
                                        className="bi flex-shrink-0 me-2"
                                        width="12"
                                        height="12"
                                        role="img"
                                        aria-label="Danger:"
                                    >
                                        <symbol
                                            id="exclamation-triangle-fill"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                        </symbol>
                                    </svg>
                                    <div>{status.password}</div>
                                </div>
                            ) : null}
                        </FloatingLabel>
                        <FloatingLabel className="mb-3">
                            <Form.Control
                                value={registerInput.password_confirmation}
                                type="password"
                                name="password_confirmation"
                                className="form-control input"
                                id="passwordRepeat"
                                placeholder="Подверждение пароля"
                                onChange={handleChange}
                            />
                            <label htmlFor="passwordRepeat">
                                Повторите пароль
                            </label>
                            {status.password_confirmation ? (
                                <div
                                    className="alert alert-danger d-flex align-items-center"
                                    role="alert"
                                >
                                    <svg
                                        className="bi flex-shrink-0 me-2"
                                        width="12"
                                        height="12"
                                        role="img"
                                        aria-label="Danger:"
                                    >
                                        <symbol
                                            id="exclamation-triangle-fill"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                        </symbol>
                                    </svg>
                                    <div>{status.password_confirmation}</div>
                                </div>
                            ) : null}
                        </FloatingLabel>

                        <Button
                            variant="outline-success"
                            type="submit"
                            className="btn-auth"
                        >
                            Регистрация
                        </Button>
                    </Form>
                </div>

                <div className="bottom-text">
                    <span className="px-3">У вас уже есть учетная запись?</span>
                    <Link to="/login" className="a-text">
                        Войти.
                    </Link>
                </div>
            </div>
        </>
    );
};
