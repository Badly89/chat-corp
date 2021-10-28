import React, { useState } from "react";
import { AUTHORS } from "../../utils/constant";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SendRoundedIcon from "@material-ui/icons/SendRounded";

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
        <form onSubmit={handleSubmit}>
            <TextField
                type="text"
                value={value}
                onChange={handleChange}
                style={{ fontSize: "16px" }}
            />
            <Button
                type="submit"
                size="small"
                variant="contained"
                color="primary"
                endIcon={<SendRoundedIcon />}
            ></Button>
        </form>
    );
};
