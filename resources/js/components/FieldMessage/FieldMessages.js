import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Message } from "./Message";

import { HeaderChat } from "./HeaderChat";
import { InputMessage } from "./InputMessage";

export const FieldMessages = ({ messages, onSendMessage, onDelMessage }) => {
    const { currUser } = useSelector((state) => state.auth.currUser);

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
                                        message.sender !== currUser.name
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
