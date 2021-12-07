import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Header, List } from "semantic-ui-react";

export const HeaderChat = ({ usersInRoom, arrTyping, title }) => {
    const [countUsersIrChannel, setCountUsersInChannel] = useState(0);
    useEffect(() => {
        setCountUsersInChannel(usersInRoom.length);
    });
    const typingEvent = arrTyping.map((item, index) => {
        return (
            <div className="typing-container" key={index}>
                <div>
                    <div className="typingBubble">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                    <span>{item.user} печатает....</span>
                </div>
            </div>
        );
    });
    return (
        <header className="title-message-field">
            <div className="wrap-title-message">
                <Card className="card-header-channel">
                    <Card.Img
                        variant="left"
                        src="/image/photo.png"
                        className="img-fluid rounded-start"
                        alt="..."
                    />
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Subtitle>
                            Количество пользователей подключенных к каналу:{" "}
                            {countUsersIrChannel}
                        </Card.Subtitle>
                        <Card.Text>
                            <small className="text-muted">{typingEvent}</small>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </header>
    );
};
