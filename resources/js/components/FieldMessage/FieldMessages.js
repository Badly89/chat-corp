import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Message } from "./OneMessage";

import { HeaderChat } from "./HeaderChat";
import { InputMessage } from "./InputMessage";

export const FieldMessages = ({ messages, onSendMessage, onDelMessage }) => {
    const { currUser } = useSelector((state) => state.auth.currUser);
    console.log(messages);
    messages.map((message) => {
        // console.log(message.user.name);
    });

    return !messages ? (
        <div className="messageList">
            <HeaderChat />
            <main className="message-field">
                <div className="message-content">
                    <div>Сообщений нет</div>
                </div>
            </main>
        </div>
    ) : (
        <>
            <div className="messageList">
                <HeaderChat />

                <main className="message-field">
                    <div className="message-content">
                        {messages?.map((message, index) => (
                            <div
                                key={index}
                                className="message"
                                style={{
                                    alignSelf:
                                        message.user_id == currUser.id
                                            ? "flex-end"
                                            : "flex-start",
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
