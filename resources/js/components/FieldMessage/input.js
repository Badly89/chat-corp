import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { AUTHORS } from "../../utils/constant";
import { BsArrowReturnLeft } from "react-icons/bs";

export const InputText = ({ onSendMessage }) => {
    const [value, setValue] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSendMessage({ text: value, sender: AUTHORS.HUMAN });
        setValue("");
    };

    return (
        <footer>
            <form onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                    <FormControl
                        type="text"
                        value={value}
                        placeholder="Введите сообщение"
                        aria-label="Введите сообщение"
                        aria-describedby="basic-addon2"
                        onChange={handleChange}
                    />
                    <Button
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
