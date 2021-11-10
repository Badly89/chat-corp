import axios from "axios";
import { makeHeaders } from "../auth/actions";
import { delMessage } from "../messages/actions";
import { ADD_MESSAGE } from "../messages/types";
import { CREATE_CHANNEL, DELETE_CHANNEL } from "./types";

export const createChannel = (newChannel) => ({
    type: CREATE_CHANNEL,
    payload: newChannel,
});

export const deleteSelectChannel = (id) => ({
    type: DELETE_CHANNEL,
    payload: id,
});

// export const actionChatList = id;
export const deleteChannel =
    (channelId, message) => async (dispatch, getState) => {
        const msg = getState().messages.messages[chatId];
        const messageLength = getState().messages.messages[channelId].length;
        if (messageLength > 0) {
            if (
                confirm(
                    "В комнате есть сообщения, вы действительно хотите удалить чат?"
                )
            ) {
                dispatch(deleteSelectChannel(channelId));
                for (let message of msg) {
                    dispatch(delMessage(channelId, message));
                }
            }
        } else {
            dispatch(delRoom(channelId));
        }
        console.log("DEL CHANNEL");
    };
