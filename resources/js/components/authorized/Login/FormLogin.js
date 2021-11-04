import React, { useState, useRef, useCallback } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "../../../style/style.css";
import { login } from "../../../store/auth/actions";
import { history } from "../../../helpers/history";

export const FormLogin = () => {
    const [token, setToken] = useState("");
    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    // const { message } = useSelector((state) => state.message);

    const dispatch = useDispatch();

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setUsername(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = useCallback(
        async (e) => {
            e.preventDefault();
            const user = { email, password };
            setLoading(true);
            try {
                await dispatch(login(user), history);
                history.push("/");
                window.location.reload();
                <Redirect to="/" />;
            } catch (err) {
                console.log(err);
            }

            // .then(() => {
            //     props.history.push("/profile");
            //     window.location.reload();
            //     <Redirect to="/" />;
            // })
            // .catch(() => {
            //     setLoading(false);
            // });
            //     } else {
            //         setLoading(false);
            //     }
        },
        [email, password]
    );

    // if (isAuthenticated) {
    //     return <Redirect to="/" />;
    // }
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
                    <form
                        className="form-signin form-floating pb-4"
                        onSubmit={handleLogin}
                    >
                        <div className="input-block">
                            <div className="form-floating pb-3">
                                <input
                                    value={email}
                                    type="text"
                                    className="form-control input"
                                    id="floatingInput"
                                    placeholder="Укажите ваш email"
                                    onChange={onChangeEmail}
                                    required
                                />
                                <label htmlFor="floatingInput">
                                    Введите ваш e-mail
                                </label>
                            </div>

                            <div className="form-floating pb-">
                                <input
                                    value={password}
                                    type="password"
                                    className="form-control input"
                                    id="floatingPassword"
                                    placeholder="Password"
                                    onChange={onChangePassword}
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
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="a-text"
                                >
                                    Забыли пароль
                                </a>
                            </label>
                        </div>

                        <button
                            className="btn btn-lg btn-success"
                            type="submit"
                        >
                            Войти
                        </button>
                    </form>
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
