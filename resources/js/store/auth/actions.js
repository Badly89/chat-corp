import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    IS_LOADING,
} from "./types";

import AuthService from "../../providers/authProvider";

import { returnStatus } from "../status/actions";
import axios from "axios";

export const register =
    ({ name, email, password }, history) =>
    (dispatch) => {
        const headers = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({
            name,
            email,
            password,
        });
        axios
            .post("/register", body, headers)
            .then((res) => {
                dispatch(
                    returnStatus(res.data, res.status, "REGISTER_SUCCESS")
                );
                dispatch({ type: REGISTER_SUCCESS });
                console.log(res);
            })
            .catch((err) => {
                console.log("FROM REGISTRATION");
                console.log(err.response.data);
                dispatch(
                    returnStatus(
                        err.response.data,
                        err.response.status,
                        "REGISTER_FAIL"
                    )
                );
                dispatch({ type: REGISTER_FAIL });
            });
    };

export const login =
    ({ email, password }, history) =>
    (dispatch, getState) => {
        const headers = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ email, password });
        axios
            .post("/login", body, headers)
            .then((res) => {
                console.log(res.data);
                dispatch({ type: LOGIN_SUCCESS, payload: res.data });
                dispatch({ type: IS_LOADING });
            })
            .catch((err) => {
                dispatch(
                    returnStatus(
                        err.response.data,
                        err.response.status,
                        "LOGIN_FAIL"
                    )
                );
            });
    };

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
};
