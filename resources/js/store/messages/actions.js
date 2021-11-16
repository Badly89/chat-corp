import React from "react";
import {
    DEL_MESSAGE,
    GET_MESSAGES_FAIL,
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    SEND_MESSAGE,
} from "./types";
import { AUTHORS } from "../../utils/constant";
import axios from "axios";

export const sendMessage = (channelId, message) => ({
    type: SEND_MESSAGE,
    payload: { message, channelId },
});
export const loadMessages = (channelId, message) => ({
    type: GET_MESSAGES_REQUEST,
    payload: { message, channelId },
});

export const delMessage = (channelId, message) => ({
    type: DEL_MESSAGE,
    payload: { message, channelId },
});

export const getMessagesChannel =
    (channelId, message) => (dispatch, getState) => {
        // try {

        const offset = getState().messages;

        console.log("CURRENTLY SELECTED CHANNEL BELOW");
        // if (!offset) {
        if (channelId !== null) {
            axios
                .get(`/getMessages/${channelId}`, {
                    withCredentials: true,
                })
                .then((res) => {
                    console.log("LOAD MESSAGES OUTPUT BELOW");
                    console.log(res.data);
                    Object.values(res.data).map((value) => {
                        dispatch(
                            loadMessages(channelId, {
                                text: value.message,
                                sender: value.user.name,
                                id: value.id,
                                timestamp: value.created_at,
                            })
                        );
                        dispatch({ type: GET_MESSAGES_SUCCESS });
                    });
                })
                .catch((err) => {
                    dispatch({ type: GET_MESSAGES_FAIL });
                });
        }
        // }
        // } catch (err) {
        //     console.log(err);
        // }
    };

export const UpdateMessages = (channelId, message) => (dispatch, getState) => {
    console.log("Обновляем сообщения");
};
export const actionMessage =
    (channelId, message) => async (dispatch, getState) => {
        const msg = message.text;
        const body = JSON.stringify({ msg, channelId });

        const lrc_token = localStorage.getItem("LRC_TOken");
        console.log(Object.values(message));

        console.log(body);
        // console.log(lrc_token);
        try {
            axios
                .post("/sendMessage", body)
                .then((res) => {
                    dispatch(sendMessage(channelId, message));

                    console.log(res);
                })
                .catch((err) => {
                    const errors = err.response.data.errors;
                    console.log(errors);
                    // Object.values(errors).map((error) => {
                    //     console.log(error.toString());
                    // });
                });
        } catch (err) {
            console.log(err);
        }
    };

export const actionDelMessage =
    (channelId, message) => (dispatch, getState) => {
        dispatch(delMessage(channelId, message));
        const selMessage = getState().messages;
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
