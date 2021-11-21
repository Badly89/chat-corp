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
    SET_SELECTED_CHANNEL,
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
                console.log("Список чатов загружен");

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

        // dispatch(getMessagesChannel(chat_id));
    }
};

export const channelSelect = (channel_id, title) => {
    return (dispatch, getState) => {
        const prevId = getState().channels.currChannel.id;
        const type = getState().channels.currChannel.type;
        window.Echo.leave(`chat-corp.${type}.${prevId}`);

        axios
            .get(`/getUsers/${channel_id}`, makeHeaders(getState), {
                withCredentials: true,
            })
            .then((res) => {
                const users = res.data[0].users;
                const channel = {
                    id: channel_id,
                    type: "channel",
                    name: title,

                    users: users,
                };
                console.log(channel);

                dispatch({ type: SET_SELECTED_CHANNEL, payload: channel });
                // dispatch({ type: ADD_CHANNEL_USERS, payload : users})
                const selectedChannelInState =

                    getState().channels.selectedChannel;

                // dispatch(getMessages(selectedChannelInState.id));

                window.Echo.join(
                    `chat-corp.channel.${selectedChannelInState.id}`
                )
                    .here((users) => {
                        console.log(users);
                        // users.forEach(user => (user.name += "FROM.HERE()"));
                        // dispatch({ type: SET_USERS_IN_ROOM, payload: users });
                    })
                    .joining((user) => {
                        console.log(user);
                        // dispatch({ type: ADD_USER_TO_ROOM, payload: user });

                        const message = {
                            user: user,
                            message: "Joined",
                            status: true,
                        };

                        if (selectedChannelInState.type === "channel") {
                            // dispatch({ type: ADD_MESSAGE, payload: message });
                        }
                    })
                    .leaving((user) => {
                        console.log(user);
                        // dispatch({ type: USER_LEAVES_ROOM, payload: user });

                        const message = {
                            user: user,
                            message: "Left",
                            status: true,
                        };
                        if (selectedChannelInState.type === "channel") {
                            // dispatch({ type: ADD_MESSAGE, payload: message });
                        }
                    })
                    .listen("MessageSent", (event) => {
                        console.log("FROM CHANNEL EVENT FUNCTION");
                        const message = {
                            user: event.user,
                            message: event.message.message,
                        };
                        console.log(message);
                        // dispatch({ type: ADD_MESSAGE, payload: message });
                        const typingEvent = {
                            user: event.user,
                            type: "typing",
                        };
                        // dispatch({
                        //     type: REMOVE_TYPING_EVENT,
                        //     payload: typingEvent,
                        // });
                    });
                // .listenForWhisper("typing", (event) => {
                //     let timer;
                //     console.log("TYPING");
                //     console.log(event.name);
                //     const message = {
                //         user: event.name,
                //         type: "typing",
                //     };
                //     dispatch({ type: ADD_TYPING_EVENT, payload: message });

                //     clearTimeout(timer);

                //     timer = setTimeout(() => {
                //         dispatch({
                //             type: REMOVE_TYPING_EVENT,
                //             payload: message,
                //         });
                //     }, 2000);
                // });
            });
    };
};

export const getChannels = () => (dispatch, getState) => {
    axios
        .get("/api/getchannels", makeHeaders(getState), {
            withCredentials: true,
        })
        .then((res) => {
            const channels = res.data;
            dispatch({ type: GET_CHANNELS, payload: channels });
        })
        .catch((err) => {});

    axios
        .get("/api/getallchannels", makeHeaders(getState), {
            withCredentials: true,
        })
        .then((res) => {
            const channels = res.data;
            dispatch({ type: GET_ALL_CHANNELS, payload: channels });
        })
        .catch((err) => {});

    axios
        .get("/api/getfriendslist", makeHeaders(getState), {
            withCredentials: true,
        })
        .then((res) => {
            console.log("FRIENDS LIST BELOW");
            console.log(res.data);
        })
        .catch((err) => {});
};
