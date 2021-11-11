import React, { useRef, useEffect } from "react";

import { Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export const Message = ({ message, onDelMessage }) => {
    const handleDelete = () => {
        onDelMessage(message);
    };
    const bottomRef = useRef(null);
    const scrollBottom = () => {
        bottomRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    };
    useEffect(() => {
        scrollBottom();
    }, [message]);
    return (
        <>
            <div ref={bottomRef}>{message.text}</div>
            <div className="message-sender">{message.sender}</div>
            <div className="btn-del">
                <MdDelete onClick={handleDelete} />
            </div>
        </>
    );
};
