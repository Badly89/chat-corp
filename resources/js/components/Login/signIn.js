import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import "../../style/style.css";

export const SignIn = () => {
    const [msg, setMsg] = useState("");
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [user, setUser] = useState({ email: "", password: "" });
    let history = useHistory("");

    const { email, password } = user;
    const handleChange = (e) => {
        // setUser({ ...user, [e.target.name]: e.target.value });
        setUser(e.target.value);
    };
    const submitLogin = () => {
        const users = { username };

        if (user.email === "") {
            alert("Необходимо указать email");
        } else if (user.password === "") {
            alert("Необходимо указать пароль");
        }
        axios
            .get("http://chat-corp.local/sanctum/csrf-cookie")
            .then((response) => {
                axios
                    .post("http://chat-corp.local/login", {
                        email: email,
                        password: password,
                    })
                    .then((response) => {
                        console.log(response);
                    });
            });
        // axios
        //     .post("http://localhost:8000/api/reactlogin/", user)
        //     .then((response) => {
        //         setMsg(response.data);
        //         localStorage.setItem("users", response.data);
        //         history.push("/route");
        //     });
    };
    return (
        <>
            <div className="block-center">
                <div className="title">
                    <img className="mb-4 logo" src="/image/logo.png" alt="" />
                    <h1 className="h1-title mb-3  text-center">
                        Вход в GBChat
                    </h1>
                    <h3 className="h3-title mb-3  text-center">
                        Какой-нибудь необычный слоган для пользователя.
                    </h3>
                    <h4 style={{ color: "green" }}>{msg}</h4>
                </div>
                <form
                    className="form-signin form-floating pb-4"
                    onSubmit={submitLogin}
                >
                    <div className="input-block">
                        <div className="form-floating pb-3">
                            <input
                                value={email}
                                type="text"
                                className="form-control input"
                                id="floatingInput"
                                placeholder="name@example.com"
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="floatingInput">Введите имя</label>
                        </div>

                        <div className="form-floating pb-">
                            <input
                                value={password}
                                type="password"
                                className="form-control input"
                                id="floatingPassword"
                                placeholder="Password"
                                onChange={handleChange}
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

                    <button className="btn btn-lg btn-success" type="submit">
                        Войти
                    </button>
                </form>
            </div>

            <div className="bottom-text">
                <span className="px-3">У вас еще нет учетной записи?</span>
                <Route>
                    <NavLink to="/register" className="a-text" />
                </Route>
            </div>
        </>
    );
};
