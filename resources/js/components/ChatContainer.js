import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import {
    actionDelMessage,
    actionMessage,
    getMessagesChannel,
} from "../store/messages/actions";
import { selectMessages } from "../store/messages/selectors";

import { ListChannels } from "./Channels/ListChannels";
import { FieldMessages } from "./FieldMessage/FieldMessages";
import { channelSelect } from "../store/channels/actions";
import { sendMessageChannel } from "../utils/echoHelpers";
import { SideBar } from "./SideBar/SideBar";
import pusherJs from "pusher-js";

export const ChatContainer = () => {
    const { channel_id } = useParams();

    const messages = useSelector(selectMessages);
    const dispatch = useDispatch();
    window.Echo = new Echo({
        broadcaster: "pusher",
        key: process.env.MIX_PUSHER_APP_KEY,
        cluster: process.env.MIX_PUSHER_APP_CLUSTER,
        forceTLS: true,
        encrypted: true,
    });

    const pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
        cluster: "eu",
    });

    const channel = pusher.subscribe("chant-corp");
    console.log(channel);
    channel.bind();

    useEffect(() => {
        window.Echo.channel(`chat-corp.channel.${channel_id}`)
            // .here((users) => {
            //     console.log(users);
            //     // users.forEach(user => (user.name += "FROM.HERE()"));
            //     // dispatch({ type: SET_USERS_IN_ROOM, payload: users });
            // })
            // .joining((user) => {
            //     console.log(user);
            // })
            .listen("MessageSent", (e) => {
                console.log(e);
            });
    }, [channel_id]);

    // const selectChannel = ((channel_id) => {
    //     dispatch(channelSelect(channel_id));
    // });
    useEffect(() => {
        dispatch(channelSelect(channel_id));
    }, [channel_id]);

    const sendNewMessage = useCallback(
        (newMessage) => {
            console.log(newMessage);
            // dispatch(sendMessageChannel(channelId, ...newMessage));
            dispatch(actionMessage(channel_id, newMessage));
        },
        // после отправки сообщений сделать обновление state messages
        //добавление сообщений путем сравнения id загруженных с последним id уже имеющихся сообщения,
        //не забываем про флаг offset
        [channel_id, messages]
    );
    const deleteMessages = useCallback(
        (selMessage) => {
            dispatch(actionDelMessage(channel_id, { ...selMessage }));
        },
        [messages]
    );

    return (
        <>
            <ListChannels />
            <FieldMessages
                messages={messages}
                onSendMessage={sendNewMessage}
                onDelMessage={deleteMessages}
            />
        </>
    );
};
