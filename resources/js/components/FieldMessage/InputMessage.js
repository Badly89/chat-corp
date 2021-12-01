import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, FormControl, InputGroup } from "react-bootstrap";

import { BsArrowReturnLeft } from "react-icons/bs";
import { sendMessage } from "../../utils/connectEcho";

export const InputMessage = ({ channel_id, currUser }) => {
    const [content, setContent] = useState("");
    const handleChange = (e) => {
        setContent(e.target.value);
        setTimeout(() => {
            window.Echo.join(`chat.channel.${channel_id}`).whisper("typing", {
                name: currUser.name,
            });
        }, 300);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(channel_id, content);
        setContent("");
    };

    return (
        <footer>
            <form onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                    <FormControl
                        type="text"
                        value={content}
                        placeholder="Введите сообщение"
                        aria-label="Введите сообщение"
                        aria-describedby="basic-addon2"
                        onChange={handleChange}
                    />
                    <Button
                        className="btn-sumbit btn-send"
                        type="submit"
                        size="small"
                        variant="contained"
                        color="outline-secondary"
                        id="button-addon2"
                        style={{
                            fontSize: "1.3rem",
                            textTransform: "lowercase",
                        }}
                    >
                        <BsArrowReturnLeft />
                    </Button>
                </InputGroup>
            </form>
        </footer>
    );
};
