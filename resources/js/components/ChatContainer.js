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

export const ChatContainer = () => {
    const token = window.localStorage.getItem("auth_token");
    const { channel_id } = useParams();
    const messages = useSelector(selectMessages);
    const dispatch = useDispatch();
    const [selChannel, setSelChannel] = useState(null);

    const echo = new Echo({
        broadcaster: "pusher",
        key: process.env.MIX_PUSHER_APP_KEY,
        wsHost: process.env.MIX_WS_HOST_URL,
        wsPort: 6001,
        wssPort: 6001,
        disableStats: true,
        forceTLS: true,
        encrypted: true,
        authEndpoint: process.env.MIX_AUTH_ENDPOINT,
        auth: {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        },
    });

    useEffect(() => {
        let channel = echo.join(`chat-corp.${token}`);
        channel
            .here((users) => {
                console.log(users);
            })
            .joining((user) => {
                console.log(user);
            })
            .listen("MessageSent", (e) => {
                console.log(">>>>>>>>>>>>>", e);
            });

        console.log("проверка работы ");
    }, [channel_id]);

    useEffect(() => {
        setSelChannel(channel_id);
        console.log(selChannel);
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
