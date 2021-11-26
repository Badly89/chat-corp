import React, { useRef, useEffect } from "react";

import { MdDelete } from "react-icons/md";

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
            <div>{message.content}</div>
            <div className="message-sender">{message.user.name}</div>
            <div className="text-small text-muted" ref={bottomRef}>
                {message.created_at}
            </div>
            <div className="btn-del">
                <MdDelete onClick={handleDelete} />
            </div>
        </>
    );
};
