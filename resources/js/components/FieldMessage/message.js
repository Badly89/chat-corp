import React, { useCallback, useState, useRef, useEffect } from "react";
import { AUTHORS } from "../../utils/constant";
<<<<<<< HEAD:resources/js/components/FieldMessage/message.js
import { Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
=======
import { InputMessage } from "./input";
import { Button } from "react-bootstrap";
>>>>>>> 9cfd6e94e81639ea53e7d5247d5e997579dc9a9c:resources/js/components/FieldMessage/messageField.js

export const Message = ({ messages, onDelMessage }) => {
    const handleDelete = () => {
        const test2 = Object.keys(messages);
        onDelMessage(messages);
        console.log(test2);
    };
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
<<<<<<< HEAD:resources/js/components/FieldMessage/message.js
                                <MdDelete />
=======
                                x
>>>>>>> 9cfd6e94e81639ea53e7d5247d5e997579dc9a9c:resources/js/components/FieldMessage/messageField.js
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
<<<<<<< HEAD:resources/js/components/FieldMessage/message.js
=======

            <InputMessage onSendMessage={onSendMessage} />
>>>>>>> 9cfd6e94e81639ea53e7d5247d5e997579dc9a9c:resources/js/components/FieldMessage/messageField.js
        </>
    );
};
