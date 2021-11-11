import axios from "axios";
import Echo from "laravel-echo";

export const initEcho = (token) => {
    window.Pusher = require("pusher-js");

    window.Echo = new Echo({
        broadcaster: "pusher",
        key: process.env.MIX_PUSHER_APP_KEY,
        cluster: process.env.MIX_PUSHER_APP_CLUSTER,
        forceTLS: true,
        encrypted: true,
    });

    window.Echo.join("chat").here((users) => {
        console.log(users);
    });
};
export const sendMessage = (message, channel_id, channel_type) => {
    const body = JSON.stringify({ message, channel_id, channel_type });

    const postHeaders = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("LRC_Token"),
            "Content-Type": "application/json",
        },
    };
    axios
        .post("/api/messages", body, postHeaders)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            const errors = err.response.data.errors;
            console.log(errors);
            Object.values(errors).map((error) => {
                console.log(error.toString());
            });
        });
};
