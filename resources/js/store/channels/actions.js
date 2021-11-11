import axios from "axios";
import { makeHeaders } from "../auth/actions";
import { delMessage } from "../messages/actions";
import { ADD_MESSAGE } from "../messages/types";
import {
    CREATE_CHANNEL,
    DELETE_CHANNEL,
    GET_ALL_CHANNELS,
    GET_CHANNELS,
} from "./types";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.get["Accept"] = "application/json";
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("auth_token");

    config.headers.Authorization = token ? `Bearer ${token}` : "";

    return config;
});
axios.defaults.withCredentials = true;

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

export const getAllChannelList = () => (dispatch, getState) => {
    axios.get("/getAllChannels").then((res) => {
        const channels = res.data;
        console.log(res.data);
        dispatch({ type: GET_ALL_CHANNELS, payload: channels });
    });
};
