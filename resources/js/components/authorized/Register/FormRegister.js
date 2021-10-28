import axios from "axios";
import { useState } from "react";
import "../../style/style.css";

export const FormRegister = () => {
    const [errors, setError] = useState("");
    const [user, setUser] = useState("");

    const { name, email, password } = user;
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    async function register() {
        let result = await axios.post(
            "http://chat-corp.local/api/register",
            user
        );
        setError("Регистрация прошла успешно!");
        setUser({ name: "", email: "", password: "" });
    }
    return (
        <>
            <div className="block-center">
                <div className="title">
                    <img className="mb-4 logo" src="/image/logo.png" alt="" />
                    <h1 className="h1-title mb-3  text-center">Регистрация</h1>
                    <h3 className="h3-title mb-3  text-center">
                        Какой-нибудь необычный слоган для пользователя.
                    </h3>
                    <h3 className="h3-title mb-3  text-center">{errors}</h3>
                </div>
                <form
                    className="form-signin form-floating pb-4"
                    onSubmit={register}
                >
                    <div className="input-block">
                        <div className="form-floating pb-3">
                            <input
                                value={name}
                                type="text"
                                className="form-control input"
                                id="name"
                                placeholder=""
                                onChange={handleChange}
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
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="email">Введите email</label>
                        </div>

                        <div className="form-floating pb-3">
                            <input
                                type="password"
                                className="form-control input"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="password">Введите пароль</label>
                        </div>
                        {/* <div className="form-floating pb-3">
                            <input
                                type="password"
                                className="form-control input"
                                id="passwordRepeat"
                                placeholder="Password"

                            />
                            <label for="passwordRepeat">Повторите пароль</label>
                        </div> */}
                    </div>

                    <button className="btn btn-lg btn-success" type="submit">
                        Регистрация
                    </button>
                </form>
            </div>

            <div className="bottom-text">
                <span className="px-3">У вас уже есть учетная запись?</span>
                <a href="#" target="_blank" className="a-text">
                    Войти.
                </a>
            </div>
        </>
    );
};
