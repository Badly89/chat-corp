import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getAllChannelList, getMessages } from "../store/channels/actions";

import { channelSelect } from "../store/channels/selectors";
import {
    actionDelMessage,
    actionMessage,
    getMessagesChannel,
} from "../store/messages/actions";
import { selectMessages } from "../store/messages/selectors";
import { ListChannels } from "./Channels/ListChannels";
import { FieldMessages } from "./FieldMessage/FieldMessages";
import { Spinner } from "./Spinner";

export const ChatContainer = ({ isLoading }) => {
    const { channelId } = useParams();

    const messages = useSelector(selectMessages);
    const dispatch = useDispatch();

    console.log(isLoading);
    useEffect(() => {
        if (!messages.messages) {
            dispatch(getMessagesChannel(channelId));
        }
    }, []);

    const sendNewMessage = useCallback(
        (newMessage) => {
            dispatch(
                actionMessage(channelId, {
                    ...newMessage,
                    id: `${channelId}-${
                        (messages[channelId]?.length || 0) - 1
                    }`,
                })
            );
        },
        [channelId, messages]
    );
    const deleteMessages = useCallback(
        (selMessage) => {
            dispatch(actionDelMessage(channelId, { ...selMessage }));
        },
        [messages]
    );

    return isLoading ? (
        <Spinner />
    ) : (
        <>
            <ListChannels isLoading={isLoading} />
            <FieldMessages
                messages={messages[channelId]}
                onSendMessage={sendNewMessage}
                onDelMessage={deleteMessages}
            />
        </>
    );
};
