import React from "react";
import { List } from "semantic-ui-react";

export const HeaderChat = ({ usersInRoom, arrTyping }) => {
    console.log(usersInRoom);

    const typingEvent = arrTyping.map((item, index) => {
        return (
            <div className="typing-container">
                <div>
                    <div className="typingBubble" key={index}>
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
            <div className="container">
                <div className="wrap-title-message">
                    <div className="card mb-3 w-100 justify-content-start">
                        <div className="d-flex justify-content-between align-items-center ">
                            <img
                                src="/image/photo.png"
                                className="img-fluid rounded-start"
                                alt="..."
                            />
                            <div className="card-body">
                                <List horizontal>
                                    {usersInRoom?.map((value, i) => {
                                        <List.Item key={i}>
                                            <List.Header>
                                                {value.name}
                                            </List.Header>
                                        </List.Item>;
                                    })}
                                </List>
                                <div className="card-text text-muted">
                                    {typingEvent}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
