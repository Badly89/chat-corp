import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router";
import "../../../style/style.css";
import { login, register } from "../../../store/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import { result } from "lodash";

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

    const handleRegister = useCallback(
        async (e) => {
            e.preventDefault();
            const data = {
                name: registerInput.name,
                email: registerInput.email,
                password: registerInput.password,
                password_confirmation: registerInput.password_confirmation,
            };
            try {
                await dispatch(register(data));

                setTimeout(() => {
                    history.push("/login");
                    // dispatch(
                    //     login(registerInput.email, registerInput.password)
                    // );
                }, 2000);
            } catch (err) {
                console.log(err);
            }
        },
        [registerInput]
    );

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
                                    value={registerInput.name}
                                    name="name"
                                    type="text"
                                    className="form-control input"
                                    id="name"
                                    placeholder="Введите имя"
                                    onChange={handleChange}
                                />
                                <label htmlFor="name">Введите имя</label>
                            </div>
                            <div className="form-floating pb-3">
                                <input
                                    value={registerInput.email}
                                    name="email"
                                    type="email"
                                    className="form-control input"
                                    id="email"
                                    placeholder="name@example.com"
                                    onChange={handleChange}
                                />
                                <label htmlFor="email">Введите email</label>
                            </div>

                            <div className="form-floating pb-3">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control input"
                                    id="password"
                                    placeholder="Пароль"
                                    value={registerInput.password}
                                    onChange={handleChange}
                                />
                                <label htmlFor="password">Введите пароль</label>
                            </div>
                            <div className="form-floating pb-3">
                                <input
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

                {/* {status && (
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
                )} */}
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
