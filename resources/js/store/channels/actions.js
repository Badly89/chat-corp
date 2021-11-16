import axios from "axios";
import Swal from "sweetalert2";
import { makeHeaders } from "../auth/actions";
import { delMessage, getMessagesChannel } from "../messages/actions";
import { ADD_MESSAGE, GET_MESSAGES } from "../messages/types";
import {
    CREATE_CHANNEL,
    DELETE_CHANNEL,
    GET_ALL_CHANNELS,
    GET_CHANNELS,
} from "./types";

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
        const msg = getState().messages.messages[channelId];
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

export const getAllChannelList = () => (dispatch, getState) => {
    const token = getState().auth.token;
    const ofset = getState().channels.ofset;
    Swal.fire({
        title: "Загружаем данные",
        allowOutsideClick: false,
    });
    Swal.showLoading();
    if (!ofset) {
        axios
            .get("/getAllChannels", token, {
                withCredentials: true,
            })
            .then((res) => {
                const channels = res.data;
                console.log(res.data);
                dispatch({ type: GET_ALL_CHANNELS, payload: channels });
                console.log("Список чатов");

                res.data.channels.map((item) => {
                    console.log(item);
                    dispatch(getMessagesChannel(item.id));
                    console.log("Загрузка сообщений канала");
                });

                Swal.fire({
                    icon: "success",
                    title: "Добро пожаловать!",
                    text: res.data.message,
                });
                Swal.close;
            });
    }
};
