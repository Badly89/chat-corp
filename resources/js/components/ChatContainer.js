import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { channelSelect } from "../store/channels/selectors";
import { actionDelMessage, actionMessage } from "../store/messages/actions";
import { selectMessages } from "../store/messages/selectors";
import { ListChannels } from "./Channels/ListChannels";
import { FieldMessages } from "./FieldMessage/FieldMessages";

export const ChatContainer = () => {
    const { channelId } = useParams();
    const messages = useSelector(selectMessages);
    const channels = useSelector(channelSelect);

    const dispatch = useDispatch();
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
