import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectMessages } from "../store/messages/selectors";

import { ListChannels } from "./Channels/ListChannels";
import { FieldMessages } from "./FieldMessage/FieldMessages";
import { channelSelect } from "../store/channels/actions";
import { connectEcho } from "../utils/connectEcho";

export const ChatContainer = () => {
    const { channel_id } = useParams();
    const { currUser } = useSelector((state) => state.auth.currUser);
    const arrTyping = useSelector((state) => state.messages.typings);
    const messages = useSelector(selectMessages);
    const dispatch = useDispatch();
    const [selChannel, setSelChannel] = useState(1);
    const token = localStorage.getItem("auth_token");
    const usersInRoom = useSelector((state) => state.channels.usersInRoom);

    useEffect(() => {
        setSelChannel(channel_id);
        connectEcho(token);
        dispatch(channelSelect(selChannel));
    }, [channel_id]);

    return (
        <>
            <ListChannels />
            <FieldMessages
                arrTyping={arrTyping}
                channel_id={channel_id}
                currUser={currUser}
                messages={messages}
                usersInRoom={usersInRoom}
            />
        </>
    );
};
