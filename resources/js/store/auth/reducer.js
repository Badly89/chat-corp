import {
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_SUCCESS,
    AUTH_FAIL,
    USER_AVATAR_UPDATED,
    USER_DESC_UPDATED,
} from "./types";

const initialState = {
    auth_token: localStorage.getItem("auth_token"),
    auth_name: localStorage.getItem("auth_name"),
    isAuthenticated: null,
    currUser: {},
};

export function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                currUser: action.payload,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,

                currUser: action.payload,
            };

        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                auth_token: localStorage.removeItem("auth_token"),
                auth_name: localStorage.removeItem("auth_name"),
                currUser: {},
            };

        case REGISTER_SUCCESS:
        case REGISTER_FAIL:
        case AUTH_FAIL:
            localStorage.removeItem("auth_token");
            // window.Echo.disconnect();
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };

        case USER_AVATAR_UPDATED:
            // Correct way to update key in nested object
            return {
                ...state,
                currUser: {
                    ...state.currUser,
                    avatar: action.payload,
                },
            };
        case USER_DESC_UPDATED:
            return {
                ...state,
                currUser: {
                    ...state.currUser,
                    desc: action.payload,
                },
            };
        default:
            return state;
    }
}
