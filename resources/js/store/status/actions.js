import { SET_MESSAGE, CLEAR_MESSAGE } from "./types";

export const setStatusMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message,
});

export const clearStatusMessage = () => ({
    type: CLEAR_MESSAGE,
});
