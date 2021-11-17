import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetPassword } from "../../../store/auth/actions";

export const FormResetPassword = () => {
    const [resetInput, setReset] = useState({
        email: "",
    });
    const history = useHistory();
    const status = useSelector((state) => state.status.statusMsg);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        e.persist();
        setReset({ ...resetInput, [e.target.name]: e.target.value });
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        const data = {
            email: resetInput.email,
        };

        dispatch(resetPassword(data));
        // history.push("/login");
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
                            Сброс пароля
                        </h1>
                        <h3 className="h3-title mb-3  text-center">
                            Введите свой адрес электронной почты, чтобы сбросить
                            пароль.
                        </h3>
                    </div>
                    <form
                        className="form-signin form-floating pb-4"
                        onSubmit={handleResetPassword}
                    >
                        <div className="input-block">
                            <div className="form-floating pb-3">
                                <input
                                    value={resetInput.email}
                                    name="email"
                                    type="email"
                                    className="form-control input"
                                    id="email"
                                    placeholder="name@example.com"
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="email">
                                    Введите свой email
                                </label>
                            </div>
                        </div>

                        <button
                            className="btn btn-lg btn-success"
                            type="submit"
                        >
                            Отправить ссылку на сброс
                        </button>
                    </form>
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
