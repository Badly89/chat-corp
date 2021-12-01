import React, { useRef } from "react";
import { Message } from "./OneMessage";
import { HeaderChat } from "./HeaderChat";
import { InputMessage } from "./InputMessage";
import { Alert, Col, Row } from "react-bootstrap";
export const FieldMessages = ({
    messages,
    channel_id,
    currUser,
    arrTyping,
    usersInRoom,
}) => {
    const messageList = messages.map((value, index) => {
        if (value.status) {
            return (
                <>
                    <Alert className="systemMsg" key={index}>
                        <strong>{value.user.name}</strong>
                        <span className="text-primary">{value.content}</span>
                    </Alert>
                </>
            );
        } else {
            if (value.user.name !== currUser.name) {
                return (
                    <div
                        key={index}
                        className="message"
                        style={{ alignSelf: "flex-start" }}
                    >
                        <Message message={value} />
                    </div>
                );
            } else {
                return (
                    <div
                        key={index}
                        className="message"
                        style={{ alignSelf: "flex-end" }}
                    >
                        <Message message={value} />
                    </div>
                );
            }
        }
    });

    return (
        <>
            <div className="messageList">
                <HeaderChat usersInRoom={usersInRoom} arrTyping={arrTyping} />

                <main className="message-field">
                    <div className="message-content">{messageList}</div>
                </main>

                <InputMessage channel_id={channel_id} currUser={currUser} />
            </div>
        </>
    );
};
