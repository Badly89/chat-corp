import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    IS_LOADING,
    LOGOUT_SUCCESS,
} from "./types";

import { returnStatus } from "../status/actions";
import axios from "axios";
import Swal from "sweetalert2";

export const register =
    ({ name, email, password, password_confirmation }) =>
    (dispatch) => {
        const body = JSON.stringify({
            name,
            email,
            password,
            password_confirmation,
        });
        axios.get("/sanctum/csrf-cookie").then((respone) => {
            axios
                .post("/register", body)
                .then((res) => {
                    if (res.data.status === 200) {
                        localStorage.setItem("auth_token", res.data.token);
                        localStorage.setItem(
                            "auth_name",
                            res.data.username.name
                        );

                        Swal.fire({
                            icon: "success",
                            title: res.status.message,
                            confirmButtonText: "Регистрация прошла успешно!",
                        });

                        dispatch(
                            returnStatus(
                                res.data.message,
                                res.status,
                                "REGISTER_SUCCESS"
                            )
                        );
                        dispatch({ type: REGISTER_SUCCESS });
                    } else {
                        dispatch(
                            returnStatus(
                                res.data.message,
                                res.status,
                                "REGISTER_FAIL"
                            )
                        );
                    }
                })
                .catch((err) => {
                    dispatch(
                        returnStatus(
                            err.res.data.message,
                            err.res.status,
                            "REGISTER_FAIL"
                        )
                    );
                    dispatch({ type: REGISTER_FAIL });
                });
        });
    };

export const login =
    ({ email, password }) =>
    (dispatch) => {
        const body = JSON.stringify({ email, password });
        axios.get("/sanctum/csrf-cookie").then((respone) => {
            axios
                .post("/login", body)
                .then((resp) => {
                    if (resp.data.status === 200) {
                        localStorage.setItem("auth_token", resp.data.token);
                        localStorage.setItem(
                            "auth_name",
                            resp.data.username.name
                        );
                        console.log(resp);

                        Swal.fire({
                            icon: "success",
                            title: "Добро пожаловать!",
                            text: resp.data.message,
                        });
                        dispatch({
                            type: LOGIN_SUCCESS,
                            payload: { currUser: resp.data.username },
                        });
                    } else if (resp.data.status === 401) {
                        console.log(resp.data);
                        dispatch(
                            returnStatus(
                                resp.data.message,
                                resp.data.status,
                                "LOGIN_FAIL"
                            )
                        );
                    } else {
                        // console.log(resp.data.validation_errors);
                    }
                })
                .catch((err) => {
                    dispatch({ type: LOGIN_FAIL });
                    dispatch(
                        returnStatus(
                            err.resp.data.message,
                            err.resp.status,
                            "LOGIN_FAIL"
                        )
                    );
                });
        });
    };

export const logout = () => (dispatch) => {
    // window.Echo.disconnect();
    axios
        .post("/logout", { withCredentials: true })
        .then((res) => {
            console.log(res);
            if (res.data.status === 200) {
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_name");

                Swal.fire({
                    icon: "success",
                    title: res.data.message,
                });

                dispatch(
                    returnStatus(res.data.message, res.status, "LOGOUT_SUCCESS")
                );
                dispatch({
                    type: LOGOUT_SUCCESS,
                    isAuthenticated: false,
                });
            } else {
            }
        })
        .catch(() => {
            dispatch({ type: LOGOUT });
        });
};

export const resetPassword =
    ({ email }) =>
    (dispatch) => {
        const body = JSON.stringify({ email });
        axios.get("/sanctum/csrf-cookie").then((respone) => {
            axios
                .post("/forgot-password/`${email}`", body)
                .then((resp) => {
                    if (resp.data.status === 200) {
                        console.log(resp);

                        Swal.fire({
                            icon: "success",
                            title: "Восстановление пароля!",
                            text: resp.data.message,
                        });
                    } else {
                        // console.log(resp.data.validation_errors);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    };

export const makeHeaders = (getState) => {
    // Get token from localstorage
    const token = getState().auth.token;
    // console.log(token);
    // Headers
    const headersObj = {
        headers: {
            "Content-type": "application/json",
        },
    };

    // If token, add to headers
    // if (token) {
    //   headersObj.headers["Authorization"] = "Bearer " + token;
    // }

    return headersObj;
};
