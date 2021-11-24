import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, FormControl, InputGroup } from "react-bootstrap";

import { BsArrowReturnLeft } from "react-icons/bs";

export const InputMessage = ({ onSendMessage }) => {
    const [content, setContent] = useState("");

    const handleChange = (e) => {
        setContent(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSendMessage(content);

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
                    >
                        <BsArrowReturnLeft />
                    </Button>
                </InputGroup>
            </form>
        </footer>
    );
};
