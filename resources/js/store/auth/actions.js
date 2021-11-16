import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    IS_LOADING,
    LOGOUT_SUCCESS,
    AUTH_SUCCESS,
    AUTH_FAIL,
} from "./types";

import { returnStatus } from "../status/actions";
import axios from "axios";
import Swal from "sweetalert2";
import { getAllChannelList } from "../channels/actions";
import { CLEAR_CHANNELS } from "../channels/types";
import { CLEAR_MESSAGES } from "../messages/types";

export const register =
    ({ name, email, password, password_confirmation }) =>
    async (dispatch) => {
        try {
            const body = JSON.stringify({
                name,
                email,
                password,
                password_confirmation,
            });
            Swal.fire({
                title: "Отправка запроса",
                allowOutsideClick: false,
            });
            Swal.showLoading();

            await axios.get("/sanctum/csrf-cookie").then((respone) => {
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
                                confirmButtonText:
                                    "Регистрация прошла успешно!",
                            });
                            history.push("/login");
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
                    .catch((error) => {
                        let errEmail = "",
                            errPass = "",
                            errPassConfirm = "";
                        if (error.response) {
                            console.log(error.response.data.errors);
                            if (error.response.data.errors.email) {
                                errEmail =
                                    error.response.data.errors.email.join(" ");
                            } else {
                                errEmail = "";
                            }
                            if (error.response.data.errors.password) {
                                errPass =
                                    error.response.data.errors.password.join(
                                        " "
                                    );
                            } else {
                                errPass = "";
                            }
                            if (
                                error.response.data.errors.password_confirmation.join(
                                    " "
                                )
                            ) {
                                errPassConfirm =
                                    error.response.data.errors
                                        .password_confirmation;
                            } else {
                                errPassConfirm = "";
                            }

                            Swal.fire({
                                icon: "error",
                                title: "Внимание!!!",
                                html:
                                    "<div>" +
                                    errEmail +
                                    "</div>" +
                                    " <div>" +
                                    errPass +
                                    "</div>" +
                                    " <div>" +
                                    errPassConfirm +
                                    "</div>",
                            });
                            dispatch(
                                returnStatus(
                                    error.response.data.errors,
                                    error.response.status,
                                    "REGISTER_FAIL"
                                )
                            );
                            dispatch({ type: REGISTER_FAIL });
                        }
                    });
            });
        } catch (err) {
            console.log(err);
        }
    };

export const login =
    ({ email, password }) =>
    async (dispatch) => {
        try {
            const body = JSON.stringify({ email, password });
            Swal.fire({
                title: "Авторизация...",
                allowOutsideClick: false,
            });
            Swal.showLoading();

            await axios.get("/sanctum/csrf-cookie").then((respone) => {
                axios
                    .post("/login", body)
                    .then((resp) => {
                        if (resp.data.status === 200) {
                            localStorage.setItem("auth_token", resp.data.token);
                            localStorage.setItem(
                                "auth_name",
                                resp.data.username.name
                            );

                            dispatch({
                                type: LOGIN_SUCCESS,
                                payload: { currUser: resp.data.username },
                            });
                            dispatch(getAllChannelList);
                            Swal.close;
                        } else if (resp.data.status === 401) {
                            console.log(resp.data);
                            dispatch(
                                returnStatus(
                                    resp.data.message,
                                    resp.data.status,
                                    "LOGIN_FAIL"
                                )
                            );
                            Swal.fire({
                                icon: "warning",
                                title: "Внимание!!!",
                                text: resp.data.message,
                            });
                        } else {
                            console.log(resp.data);
                            // console.log(resp.data.validation_errors);
                        }
                    })
                    .catch((error) => {
                        if (error.response) {
                            const errEmail =
                                error.response.data.errors.email.join(" ");
                            const errPass =
                                error.response.data.errors.password.join(" ");
                            Swal.fire({
                                icon: "error",
                                title: "Внимание!!!",
                                html:
                                    "<div>" +
                                    errEmail +
                                    "</div>" +
                                    " <div>" +
                                    errPass +
                                    "</div>",
                            });
                            dispatch({ type: LOGIN_FAIL });
                            dispatch(
                                returnStatus(
                                    error.response.data.errors,
                                    error.response.status,
                                    "LOGIN_FAIL"
                                )
                            );
                        }
                    });
            });
        } catch (err) {
            console.log(err);
        }
    };

export const logout = () => async (dispatch) => {
    Swal.fire({
        title: "Завершаем работу... ",
        allowOutsideClick: false,
    });
    Swal.showLoading();
    try {
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
                    Swal.close;

                    dispatch(
                        returnStatus(
                            res.data.message,
                            res.status,
                            "LOGOUT_SUCCESS"
                        )
                    );
                    dispatch({
                        type: LOGOUT_SUCCESS,
                        isAuthenticated: false,
                    });
                    dispatch({ type: CLEAR_CHANNELS });
                    dispatch({ type: CLEAR_MESSAGES });
                } else {
                }
            })
            .catch(() => {
                dispatch({ type: LOGOUT });
            });
    } catch (err) {
        console.log(err);
    }
    // window.Echo.disconnect();
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

export const getProfile = () => (dispatch, getState) => {
    axios
        .get("/profile", { withCredentials: true })
        .then((resp) => {
            dispatch({ type: AUTH_SUCCESS, payload: resp.data });
            const selState = getState();
            const useId = selState.auth.currUser.id;
        })
        .catch((err) => {
            dispatch({ type: AUTH_FAIL });
        });
};
