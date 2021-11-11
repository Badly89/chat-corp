import React, { useState, useEffect } from "react";
import { Alert, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { login } from "../../../store/auth/actions";

export const FormLogin = () => {
    const status = useSelector((state) => state.status);
    const [errMsg, setErrMsg] = useState("");
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
    console.log(status);
    const handleLogin = (e) => {
        e.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password,
        };
        dispatch(login(data));
    };
    useEffect(() => {
        if (status.id === "LOGIN_FAIL") {
            setErrMsg(status.msgStatus);
            console.log("Bingo");
        }
        return () => {
            console.log("Exit");
        };
    }, [errMsg]);

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
                {errMsg && <Alert variant="warning">{errMsg}</Alert>}
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
