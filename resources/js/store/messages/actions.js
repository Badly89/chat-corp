import React from "react";
import {
    DEL_MESSAGE,
    GET_MESSAGES,
    LOAD_MESSAGES,
    SEND_MESSAGE,
} from "./types";
import { AUTHORS } from "../../utils/constant";
import axios from "axios";

export const sendMessage = (channelId, message) => ({
    type: SEND_MESSAGE,
    payload: { message, channelId },
});
export const loadMessages = (channelId, message) => ({
    type: LOAD_MESSAGES,
    payload: { message, channelId },
});

export const delMessage = (channelId, message) => ({
    type: DEL_MESSAGE,
    payload: { message, channelId },
});

export const getMessagesChannel =
    (channelId, message) => async (dispatch, getState) => {
        try {
            // dispatch(loadMessages(channelId, message));
            console.log("CURRENTLY SELECTED CHANNEL BELOW");
            console.log(channelId);
            if (channelId !== null) {
                axios
                    .get(`/getMessages/${channelId}`, {
                        withCredentials: true,
                    })
                    .then((res) => {
                        console.log("LOAD MESSAGES OUTPUT BELOW");
                        console.log(res.data);
                        Object.values(res.data).map((value) => {
                            console.log(value.id, value.message, value.user_id);
                            dispatch(
                                loadMessages(channelId, {
                                    text: value.message,
                                    sender: value.user_id,
                                    id: value.id,
                                })
                            );
                        });

                        // Object.values(res.data).map((item) => {
                        //     console.log(item);
                        //     dispatch(
                        //         getMessages(channelId, {
                        //             text: item.message,
                        //             sender: item.user_id,
                        //             id: item.id,
                        //         })
                        //     );
                        // });
                        // Object.values(res.data).forEach(([key, value]) => {

                        // dispatch(
                        //     loadMessages(channelId, {
                        //         text: item.message,
                        //         sender: item.user_id,
                        //         id: item.id,
                        //     })
                        // );
                        // });
                    })
                    .catch((err) => {});
            }
        } catch (err) {
            console.log(err);
        }
    };

export const actionMessage =
    (channelId, message) => async (dispatch, getState) => {
        try {
            dispatch(sendMessage(channelId, message));

            if (channelId !== null) {
                const res = await fetch(
                    `https://www.botlibre.com/rest/api/form-chat?instance=165&message="${message.text}"&application=428262090517998158`
                );

                const response = await res.text();
                const answer = response.substring(
                    response.lastIndexOf("<message>") + 9,
                    response.lastIndexOf("</message>")
                );

                const messLength =
                    getState().messages.messages[channelId]?.length;

                dispatch(
                    sendMessage(channelId, {
                        text: answer,
                        sender: AUTHORS.BOT,
                        id: `${channelId}-${messLength + 1}`,
                    })
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

// export const actionDelMessage = (chatId, message) => async (
//   dispatch,
//   getState
// ) => {
//   dispatch(delMessage(chatId, message));
// };
export const actionDelMessage =
    (channelId, message) => (dispatch, getState) => {
        dispatch(delMessage(channelId, message));
        const selMessage = getState().messages;
    };
