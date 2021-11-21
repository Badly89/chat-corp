import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Echo from "laravel-echo";
import { actionDelMessage, actionMessage } from "../store/messages/actions";
import { selectMessages } from "../store/messages/selectors";

import { ListChannels } from "./Channels/ListChannels";
import { FieldMessages } from "./FieldMessage/FieldMessages";
import { channelSelect } from "../store/channels/actions";
import { sendMessageChannel } from "../utils/echoHelpers";

export const ChatContainer = () => {
    const { channelId } = useParams();
    const channel = useSelector((state) => {
        state.channels;
    });
    console.log(channel);
    const [loading, setLoading] = useState(false);
    const messages = useSelector(selectMessages);
    const dispatch = useDispatch();
    window.Echo = new Echo({
        broadcaster: "pusher",
        key: process.env.MIX_PUSHER_APP_KEY,
        cluster: process.env.MIX_PUSHER_APP_CLUSTER,
        forceTLS: true,
        encrypted: true,
    });
    const selectChannel = () => {
        channelSelect(channelId, "Главный канал");
    };
    useEffect(() => {
        window.Echo.join(`chat-corp.channel.${channelId}`)
            .here((users) => {
                console.log(users);
                // users.forEach(user => (user.name += "FROM.HERE()"));
                // dispatch({ type: SET_USERS_IN_ROOM, payload: users });
            })
            .joining((user) => {
                console.log(user);
            })
            .listen("MessageSent", (e) => {
                console.log(e);
            });
        // dispatch(selectChannel(channelId));
    });

    // console.log(messages[channelId]?.length);

    // useEffect(() => {
    //     if (!messages.messages) {
    //         dispatch(getMessagesChannel(channelId));
    //     }
    // }, []);

    console.log(loading);
    const sendNewMessage = useCallback(
        (newMessage) => {
            dispatch(sendMessageChannel(channelId, ...newMessage, "channel"));
            // dispatch(actionMessage(channelId, ...newMessage));
        },
        // после отправки сообщений сделать обновление state messages
        //добавление сообщений путем сравнения id загруженных с последним id уже имеющихся сообщения,
        //не забываем про флаг offset
        [channelId, messages]
    );
    const deleteMessages = useCallback(
        (selMessage) => {
            dispatch(actionDelMessage(channelId, { ...selMessage }));
        },
        [messages]
    );

    return (
        <>
            <ListChannels />
            <FieldMessages
                selectChannel={selectChannel}
                messages={messages[channelId]}
                onSendMessage={sendNewMessage}
                onDelMessage={deleteMessages}
            />
        </>
    );
};
