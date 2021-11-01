import React, { useCallback, useState, useRef, useEffect } from "react";
import { AUTHORS } from "../../utils/constant";
import { Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";

export const Message = ({ messages, onDelMessage }) => {
    const handleDelete = () => {
        const test2 = Object.keys(messages);
        onDelMessage(messages);
        console.log(test2);
    };
    const bottomRef = useRef(null);
    const scrollBottom = () => {
        bottomRef.current?.scrollBottom({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollBottom();
    }, [messages]);
    return (
        <>
            <div className="message-content">
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
                            <Button
                                aria-label="delete"
                                size="small"
                                id={id}
                                onClick={handleDelete}
                            >
                                <MdDelete />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
