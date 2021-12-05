import React, { useRef, useEffect } from "react";
import { Message } from "./OneMessage";
import { HeaderChat } from "./HeaderChat";
import { InputMessage } from "./InputMessage";
import { Alert, Card } from "react-bootstrap";
import Moment from "react-moment";
import "moment-timezone";

Moment.globalLocale = "ru";
Moment.globalFormat = "hh:mm:ss";

export const FieldMessages = ({
    messages,
    channel_id,
    currUser,
    arrTyping,
    usersInRoom,
    title,
}) => {
    const calendarStrings = {
        lastDay: "[Вчера at] LT",
        sameDay: "[Сегодня at] LT",
        nextDay: "[Завтра at] LT",
        lastWeek: "[последнее] dddd [at] LT",
        nextWeek: "dddd [at] LT",
        sameElse: "L",
    };
    const messagesRef = useRef(null);
    const scrollBottom = () => {
        messagesRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    };
    useEffect(() => {
        scrollBottom();
    }, [messages]);

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
                    <Card className="card-guest" key={value.id}>
                        <Card.Img
                            src="/image/avatar.png"
                            className="avatar-img-guest"
                            title={value.user.name}
                        />
                        <Card.Body className="message-guest">
                            <Card.Text className="card-text-message">
                                {value.content}
                            </Card.Text>
                            <Card.Text className="text-muted pw-1">
                                <small>
                                    <Moment
                                        fromNow
                                        calendar={calendarStrings}
                                        date={value.created_at}
                                    />
                                </small>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                );
            } else {
                return (
                    <Card className="card-sender" key={value.id}>
                        <Card.Body className="message-sender">
                            <Card.Text className="text-muted pe-1">
                                <small>
                                    <Moment
                                        fromNow
                                        calendar={calendarStrings}
                                        date={value.created_at}
                                    />
                                </small>
                            </Card.Text>
                            <Card.Text className="card-text-message">
                                {value.content}
                            </Card.Text>
                        </Card.Body>
                        <Card.Img
                            src="/image/avatar.png"
                            className="avatar-img-sender"
                            title={value.user.name}
                        />
                    </Card>
                );
            }
        }
    });

    return (
        <>
            <div className="messageList">
                <HeaderChat
                    usersInRoom={usersInRoom}
                    arrTyping={arrTyping}
                    title={title}
                />

                <main className="message-field">
                    <div className="message-content">
                        {messageList}
                        <div ref={messagesRef} />
                    </div>
                </main>

                <InputMessage channel_id={channel_id} currUser={currUser} />
            </div>
        </>
    );
};
