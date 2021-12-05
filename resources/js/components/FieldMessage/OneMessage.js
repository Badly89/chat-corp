import React, { useRef, useEffect } from "react";
import Moment from "react-moment";
import "moment-timezone";
Moment.globalLocale = "ru";
Moment.globalFormat = "D MMM YYYY hh:mm:ss";

export const Message = ({ message }) => {
    const calendarStrings = {
        lastDay: "[Вчера at] LT",
        sameDay: "[Сегодня at] LT",
        nextDay: "[Завтра at] LT",
        lastWeek: "[последнее] dddd [at] LT",
        nextWeek: "dddd [at] LT",
        sameElse: "L",
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
            <div className="message-sender">{message.user.name}</div>
            <div>{message.content}</div>
            <Moment
                calendar={calendarStrings}
                date={message.created_at}
                className="text-small text-muted"
            />
            <div ref={bottomRef}></div>
        </>
    );
};
