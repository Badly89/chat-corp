import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Message, MessageField } from "./Message";
import { selectMessages } from "../../store/messages/selectors";
import { AUTHORS } from "../../utils/constant";

import { actionDelMessage, actionMessage } from "../../store/messages/actions";
import { HeaderChat } from "./HeaderChat";
import { InputMessage } from "./InputMessage";

export const FieldMessages = ({ messages, onSendMessage, onDelMessage }) => {
    const currUser = useSelector((state) => state.auth.currUser);
    console.log(currUser.name);
    return (
        <>
            <div className="messageList">
                <HeaderChat />

                <main className="message-field">
                    <div className="message-content">
                        {messages?.map((message, i) => (
                            <div
                                key={i}
                                className="message"
                                style={{
                                    alignSelf:
                                        message.sender == AUTHORS.BOT
                                            ? "flex-start"
                                            : "flex-end",
                                }}
                            >
                                <Message
                                    message={message}
                                    onDelMessage={onDelMessage}
                                />
                            </div>
                        ))}
                    </div>
                </main>
                <InputMessage onSendMessage={onSendMessage} />
            </div>
        </>
    );
};
