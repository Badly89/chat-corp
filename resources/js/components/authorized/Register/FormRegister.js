import React, { useEffect, useState } from "react";

import "../../../style/style.css";

import { login, register } from "../../../store/auth/actions";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectStatus } from "../../../store/status/selectors";
import { history } from "../../../helpers/history";

export const FormRegister = () => {
    const [name, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [statusMsg, setStatusMsg] = useState("");
    const { status } = useSelector((state) => state.status);
    console.log(statusMsg);
    const dispatch = useDispatch();
    const onChangeUsername = (e) => {
        const name = e.target.value;
        setUsername(name);
    };
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const onChangePasswordConfirmation = (e) => {
        const password_confirmation = e.target.value;
        setPasswordConfirmation(password_confirmation);
    };

    // useEffect(() => {
    //     if (status === "REGISTER_FAIL") {
    //         setStatusMsg({ msg: status.statusMsg.message });
    //         console.log("REGISTER_FAIL");
    //     }
    //     if (status === "REGISTER_SUCCESS") {
    //         setStatusMsg({ msg: status.statusMsg.message });
    //         setTimeout(() => {
    //             console.log("LOGIN");
    //         }, 2000);
    //     }
    // }, [status]);
    // if (status !== preventDefault) {
    //     if (status.id === "REGISTER_FAIL") {
    //         setStatusMsg();
    //     }
    // }

    const handleRegister = (e) => {
        e.preventDefault();
        const body = { name, email, password };
        dispatch(register(body));

        setSuccessful(true);
    };
    if (successful) {
        // <Redirect to="/login" />;
        setTimeout(() => {
            // dispatch(login(email, password));
            console.log("LIGN_SUCCESS");
        }, 2000);

        console.log("REGISTER_SUCCESS");
    }
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
                    <form
                        className="form-signin form-floating pb-4"
                        onSubmit={handleRegister}
                    >
                        <div className="input-block">
                            <div className="form-floating pb-3">
                                <input
                                    value={name}
                                    type="text"
                                    className="form-control input"
                                    id="name"
                                    placeholder=""
                                    onChange={onChangeUsername}
                                    required
                                />
                                <label htmlFor="name">Введите имя</label>
                            </div>
                            <div className="form-floating pb-3">
                                <input
                                    value={email}
                                    type="email"
                                    className="form-control input"
                                    id="email"
                                    placeholder="name@example.com"
                                    onChange={onChangeEmail}
                                    required
                                />
                                <label htmlFor="email">Введите email</label>
                            </div>

                            <div className="form-floating pb-3">
                                <input
                                    type="password"
                                    className="form-control input"
                                    id="password"
                                    placeholder="Пароль"
                                    value={password}
                                    onChange={onChangePassword}
                                    required
                                />
                                <label htmlFor="password">Введите пароль</label>
                            </div>
                            <div className="form-floating pb-3">
                                <input
                                    value={password_confirmation}
                                    type="password"
                                    className="form-control input"
                                    id="passwordRepeat"
                                    placeholder="Подверждение пароля"
                                    onChange={onChangePasswordConfirmation}
                                />
                                <label htmlFor="passwordRepeat">
                                    Повторите пароль
                                </label>
                            </div>
                        </div>

                        <button
                            className="btn btn-lg btn-success"
                            type="submit"
                        >
                            Регистрация
                        </button>
                    </form>
                </div>

                {status && (
                    <div className="form-group">
                        <div
                            className={
                                successful
                                    ? "alert alert-success"
                                    : "alert alert-danger"
                            }
                            role="alert"
                        >
                            {status}
                        </div>
                    </div>
                )}
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
