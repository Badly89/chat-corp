import React, { useCallback, useState } from "react";
import { AUTHORS } from "../../utils/constant";
import { InputText } from "./input";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { IconButton } from "@material-ui/core";

export const MessageField = ({ messages, onSendMessage, onDelMessage }) => {
    const handleDelete = (e) => {
        const test2 = Object.keys(messages);
        onDelMessage(e.target.id);
        console.log(test2);
    };
    return (
        <>
            <div className="message-field">
                {messages?.map(({ id, text, sender }) => (
                    <div
                        key={id}
                        className="message"
                        style={{
                            alignSelf:
                                sender == AUTHORS.BOT
                                    ? "flex-start"
                                    : "flex-end",
                        }}
                    >
                        <div>{text}</div>
                        <div className="message-sender">{sender}</div>
                        <div className="btn-del">
                            <IconButton
                                aria-label="delete"
                                size="small"
                                id={id}
                                onClick={handleDelete}
                            >
                                <HighlightOffIcon />
                            </IconButton>
                        </div>
                    </div>
                ))}
            </div>
            <InputText onSendMessage={onSendMessage} />
        </>
    );
};
