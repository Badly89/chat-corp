import React from "react";
import {
    DEL_MESSAGE,
    GET_MESSAGES_FAIL,
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    SEND_MESSAGE,
    UPDATE_MESSAGES,
} from "./types";

import axios from "axios";

export const sendMessage = (channel_id, content) => ({
    type: SEND_MESSAGE,
    payload: { content, channel_id },
});
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
                // Object.values(res.data).map((value) => {

                dispatch(loadMessages(res.data));
                // dispatch({ type: GET_MESSAGES_SUCCESS });
                // });
            })
            .catch((err) => {
                // dispatch({ type: GET_MESSAGES_FAIL });
            });
    }
};

export const UpdateMessages = (channel_id, content) => (dispatch, getState) => {
    console.log("Обновляем сообщения");
};
export const actionMessage = (channel_id, content) => (dispatch, getState) => {
    const body = JSON.stringify({ channel_id, content });

    console.log(channel_id);
    // dispatch(sendMessage(content));
    console.log(body);
    // console.log(lrc_token);

    axios
        .post("/sendMessage", body, {
            withCredentials: true,
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            const errors = err.response.data.errors;
            console.log(errors);
        });
};

export const actionDelMessage =
    (channel_id, content) => (dispatch, getState) => {
        dispatch(delMessage(channel_id, content));
        const selMessage = getState().content;
    };

// dispatch(sendMessage(channelId, message));

// if (channelId !== null) {
//     const res = await fetch(
//         `https://www.botlibre.com/rest/api/form-chat?instance=165&message="${message.text}"&application=428262090517998158`
//     );

//     const response = await res.text();
//     const answer = response.substring(
//         response.lastIndexOf("<message>") + 9,
//         response.lastIndexOf("</message>")
//     );

//     const messLength =
//         getState().messages.messages[channelId]?.length;

//     dispatch(
//         sendMessage(channelId, {
//             text: answer,
//             sender: AUTHORS.BOT,
//             id: `${channelId}-${messLength + 1}`,
//         })
//     )
