import React from "react";
import { DEL_MESSAGE, SEND_MESSAGE } from "./types";
import { AUTHORS } from "../../utils/constant";

export const sendMessage = (channelId, message) => ({
    type: SEND_MESSAGE,
    payload: { message, channelId },
});

export const delMessage = (channelId, message) => ({
    type: DEL_MESSAGE,
    payload: { message, channelId },
});

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
