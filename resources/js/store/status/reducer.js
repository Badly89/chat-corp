import { CLEAR_MESSAGE, SET_MESSAGE } from "./types";

const initialState = {};

export function messageAuth(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_MESSAGE:
            return { ...state, message: payload };
        case CLEAR_MESSAGE:
            return { ...state, message: "" };

        default:
            break;
    }
}
