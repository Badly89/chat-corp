import { delMessage } from "../messages/actions";
import { ADD_ROOM, DEL_ROOM } from "./types";

export const createChat = (newRoom) => ({
    type: ADD_ROOM,
    payload: newRoom,
});

export const deleteSelectChat = (id) => ({
    type: DEL_ROOM,
    payload: id,
});

// export const actionChatList = id;
export const deleteChat = (chatId, message) => async (dispatch, getState) => {
    const msg = getState().messages.messages[chatId];
    const messageLength = getState().messages.messages[chatId].length;
    if (messageLength > 0) {
        if (
            confirm(
                "В комнате есть сообщения, вы действительно хотите удалить чат?"
            )
        ) {
            dispatch(delRoom(chatId));
            for (let message of msg) {
                dispatch(delMessage(chatId, message));
            }
        }
    } else {
        dispatch(delRoom(chatId));
    }
    console.log("DEL ROOM");
};
