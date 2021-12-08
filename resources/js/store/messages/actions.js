import React from "react";
import {
    DEL_MESSAGE,
    GET_MESSAGES_FAIL,
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
} from "./types";

import axios from "axios";

export const loadMessages = (messages) => ({
    type: GET_MESSAGES_REQUEST,
    payload: messages,
});

export const delMessage = (channel_id, content) => ({
    type: DEL_MESSAGE,
    payload: { content, channel_id },
});

export const getMessagesChannel = (channel_id) => (dispatch, getState) => {
    const offset = getState().messages;

    console.log("CURRENTLY SELECTED CHANNEL BELOW");

    if (channel_id !== null) {
        axios
            .get(`/getMessages/${channel_id}`, {
                withCredentials: true,
            })
            .then((res) => {
                console.log("LOAD MESSAGES OUTPUT BELOW");
                console.log(res.data);
                dispatch(loadMessages(res.data));

                dispatch({ type: GET_MESSAGES_SUCCESS });
                // });
            })
            .catch((err) => {
                dispatch({ type: GET_MESSAGES_FAIL });
            });
    }
};
