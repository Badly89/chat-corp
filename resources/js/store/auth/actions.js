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
import { Redirect } from "react-router";

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
                        localStorage.setItem("auth_name", res.data.username);
                        console.log(res.data);

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
                        // console.log(res.data.validation_errors);
                    }
                })
                .catch((err) => {
                    // dispatch(
                    //     returnStatus(
                    //         err.response.data.validation_errors,
                    //         err.response.status,
                    //         "REGISTER_FAIL"
                    //     )
                    // );
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
                        console.log(resp);
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
                        dispatch(
                            returnStatus(
                                resp.data.message,
                                resp.status,
                                "LOGIN_SUCCESS"
                            )
                        );
                        dispatch({
                            type: LOGIN_SUCCESS,
                            payload: { currUser: resp.data.username },
                        });

                        dispatch({ type: IS_LOADING });
                    } else {
                        console.log(resp.data.validation_errors);
                    }
                })
                .catch((err) => {
                    // dispatch(
                    //     returnStatus(
                    //         resp.data.message,
                    //         resp.status,
                    //         "LOGIN_FAIL"
                    //     )
                    // );
                    // dispatch({ type: LOGIN_FAIL });
                    // console.log(err.response.validation_errors);
                });
        });
    };

export const logout = () => (dispatch) => {
    // axios.get("/sanctum/csrf-cookie").then((respone) => {
    axios
        .post("/logout", { withCredentials: true })
        .then((res) => {
            console.log(res);
            if (res.data.status === 200) {
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_name");
                history.push("/login");
                Swal.fire({
                    icon: "success",
                    title: res.data.message,
                });

                dispatch(
                    returnStatus(res.data.message, res.status, "LOGOUT_SUCCESS")
                );
                dispatch({
                    type: LOGOUT_SUCCESS,
                    payload: {
                        currUser: {},
                        isAuthenticated: false,
                    },
                });
            } else {
                console.log(res.data.validation_errors);
            }
        })
        .catch(() => {
            dispatch({ type: LOGOUT });
        });
    // });
};
