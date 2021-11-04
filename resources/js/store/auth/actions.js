import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    IS_LOADING,
    LOGOUT_SUCCESS,
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
        axios.get("/sanctum/csrf-cookie").then((respone) => {
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
        axios.get("/sanctum/csrf-cookie").then((respone) => {
            axios
                .post("/login", body, headers)
                .then((respone) => {
                    console.log(respone.data);
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: { currUser: respone.data },
                    });

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
        });
    };

export const logout = () => (dispatch) => {
    localStorage.removeItem("user");
    dispatch({ type: LOGOUT_SUCCESS });
};
// export const logout = () => (dispatch) => {
//     // AuthService.logout();
//     // window.Echo.disconnect();
//     axios.get("/sanctum/csrf-cookie").then((respone) => {
//         axios
//             .get("/logout", { withCredentials: true })
//             .then((res) => {
//                 dispatch({ type: LOGOUT_SUCCESS });
//             })
//             .catch((err) => console.log(err));
//         dispatch({
//             type: LOGOUT,
//         });
//     });
// };
