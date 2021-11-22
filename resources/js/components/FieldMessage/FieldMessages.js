import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Message } from "./OneMessage";

import { HeaderChat } from "./HeaderChat";
import { InputMessage } from "./InputMessage";

export const FieldMessages = ({ messages, onSendMessage, onDelMessage }) => {
    const { currUser } = useSelector((state) => state.auth.currUser);

    console.log(currUser.id);
    console.log(messages);
    return (
        <>
            <div className="messageList">
                <HeaderChat />

                <main className="message-field">
                    <div className="message-content">
                        {messages?.map((message, index) => (
                            <Message
                                message={message}
                                index={index}
                                currUser={currUser}
                                onDelMessage={onDelMessage}
                            />
                        ))}
                    </div>
                </main>
                <InputMessage onSendMessage={onSendMessage} />
            </div>
        </>
    );
};
