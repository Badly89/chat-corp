import axios from "axios";
import Echo from "laravel-echo";
import Swal from "sweetalert2";
import { connectEcho } from "../../utils/connectEcho";
import { delMessage, getMessagesChannel } from "../messages/actions";
import { ADD_MESSAGE, GET_MESSAGES } from "../messages/types";
import {
    ADD_USER_TO_ROOM,
    CREATE_CHANNEL,
    DELETE_CHANNEL,
    GET_ALL_CHANNELS,
    GET_CHANNELS,
    SET_SELECTED_CHANNEL,
    SET_USERS_IN_ROOM,
} from "./types";

export const createChannel = (newChannel) => ({
    type: CREATE_CHANNEL,
    payload: newChannel,
});

export const deleteSelectChannel = (id) => ({
    type: DELETE_CHANNEL,
    payload: id,
});

//
export const getAllChannelList = () => (dispatch, getState) => {
    const ofset = getState().channels.ofset;
    Swal.fire({
        title: "Загружаем данные",
        allowOutsideClick: false,
    });
    Swal.showLoading();
    if (!ofset) {
        Swal.showLoading();

        axios
            .get("/getAllChannels", {
                withCredentials: true,
            })
            .then((res) => {
                const channels = res.data;

                console.log(res.data.channels);
                dispatch({ type: GET_ALL_CHANNELS, payload: channels });
                console.log("Список каналов загружен");
                Swal.fire({
                    icon: "success",
                    title: "Добро пожаловать!",
                    text: res.data.message,
                });
                Swal.close;
            });
    }
};

export const channelSelect = (channel_id) => {
    return (dispatch, getState) => {
        const prevId = getState().channels.currChannel.id;
        const type = getState().channels.currChannel.type;
        // window.Echo.leave(`chat-corp.${type}.${prevId}`);
        console.log(channel_id);
        // const echoInit = new Echo(connectEcho);
        axios
            .get(`/getUsers/${channel_id}`, {
                withCredentials: true,
            })
            .then((res) => {
                console.log("Юзверы канала", res.data);
                // const users = res.data[0].users;
                const channel = {
                    id: channel_id,
                    type: "channel",
                    //     users: users,
                };

                dispatch({ type: SET_SELECTED_CHANNEL, payload: channel });
                // dispatch({ type: ADD_CHANNEL_USERS, payload : users})
                const selectedChannelInState = getState().channels.currChannel;
                console.log("Загрузка сообщений канала");
                console.log(selectedChannelInState);
                dispatch(getMessagesChannel(selectedChannelInState.id));

                echoInit
                    .join("chat-corp." + selectedChannelInState.id)
                    .here((users) => {
                        console.log(users);
                        dispatch({ type: SET_USERS_IN_ROOM, payload: users });
                    })
                    .joining((user) => {
                        console.log(user);
                        dispatch({ type: ADD_USER_TO_ROOM, payload: user });

                        const message = {
                            user: user,
                            message: "Joined",
                            status: true,
                        };

                        if (selectedChannelInState.type === "channel") {
                            dispatch({ type: ADD_MESSAGE, payload: message });
                        }
                    })
                    .leaving((user) => {
                        console.log(user);
                    })
                    .listen("MessageSent", (event, message) => {
                        console.log("FROM CHANNEL EVENT FUNCTION");
                        сonsole.log(event);
                    })
                    .listenForWhisper("typing", (event) => {
                        console.log("TYPING");
                        console.log(event);
                    });
            });
    };
};

// export const getChannels = () => (dispatch, getState) => {
//     axios
//         .get("/api/getchannels", {
//             withCredentials: true,
//         })
//         .then((res) => {
//             const channels = res.data;
//             dispatch({ type: GET_CHANNELS, payload: channels });
//         })
//         .catch((err) => {});

//     axios
//         .get("/api/getallchannels", {
//             withCredentials: true,
//         })
//         .then((res) => {
//             const channels = res.data;
//             dispatch({ type: GET_ALL_CHANNELS, payload: channels });
//         })
//         .catch((err) => {});

//     axios
//         .get("/api/getfriendslist", {
//             withCredentials: true,
//         })
//         .then((res) => {
//             console.log("FRIENDS LIST BELOW");
//             console.log(res.data);
//         })
//         .catch((err) => {});
// };
