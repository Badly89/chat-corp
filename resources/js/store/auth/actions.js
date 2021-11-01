import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "./types";

import AuthService from "../../providers/authProvider";

import { returnStatus } from "../status/actions";

export const register =
    (name, email, password, password_confirmation) => (dispatch) => {
        return AuthService.register(
            name,
            email,
            password,
            password_confirmation
        ).then(
            (response) => {
                dispatch({
                    type: REGISTER_SUCCESS,
                });
                dispatch(
                    returnStatus(
                        response.data,
                        response.status,
                        "REGISTER_SUCCESS"
                    )
                );
                return Promise.resolve();
            },
            (error) => {
                const message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                dispatch({
                    type: REGISTER_FAIL,
                });

                dispatch(
                    returnStatus(
                        err.response.data,
                        err.response.data.message,
                        "REGISTER_FAIL"
                    )
                );

                return Promise.reject();
            }
        );
    };

export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data },
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: LOGIN_FAIL,
            });

            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
};
