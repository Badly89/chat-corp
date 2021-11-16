import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import {
    actionDelMessage,
    actionMessage,
    getMessagesChannel,
} from "../store/messages/actions";
import { selectMessages } from "../store/messages/selectors";
import { ListChannels } from "./Channels/ListChannels";
import { FieldMessages } from "./FieldMessage/FieldMessages";

export const ChatContainer = () => {
    const { channelId } = useParams();
    const [loading, setLoading] = useState(false);
    const messages = useSelector(selectMessages);
    const dispatch = useDispatch();
    // console.log(messages[channelId]?.length);

    // useEffect(() => {
    //     if (!messages.messages) {
    //         dispatch(getMessagesChannel(channelId));
    //     }
    // }, []);

    console.log(loading);
    const sendNewMessage = useCallback(
        (newMessage) => {
            dispatch(
                actionMessage(channelId, {
                    ...newMessage,
                    id: `${(messages[channelId]?.length || 0) - 1}`,
                })
            );
            // после отправки сообщений сделать обновление state messages
            //добавление сообщений путем сравнения id загруженных с последним id уже имеющихся сообщения,
            //не забываем про флаг offset
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
                messages={messages[channelId]}
                onSendMessage={sendNewMessage}
                onDelMessage={deleteMessages}
            />
        </>
    );
};
