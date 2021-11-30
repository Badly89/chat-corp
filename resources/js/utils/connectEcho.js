import Pusher from "pusher-js";
import Echo from "laravel-echo";
const token = localStorage.getItem("auth_token");

export const connectEcho = (token, channel_id) => {
    window.Echo = new Echo({
        broadcaster: "pusher",
        key: process.env.MIX_PUSHER_APP_KEY,
        cluster: process.env.MIX_PUSHER_APP_CLUSTER,
        forceTLS: true,
        encrypted: true,
        // authEndpoint: "/broadcasting/auth",
        // auth: {
        //     headers: {
        //         Authorization: "Bearer" + token,
        //         Accept: "application/json",
        //     },
        // },
        // csrfToken: document
        //     .querySelector('meta[name="csrf-token"]')
        //     .getAttribute("content"),
    });
    window.Echo.connector.options.auth.headers["Authorization"] =
        "Bearer " + token;
    window.Echo.options.auth = {
        headers: {
            Authorization: "Bearer " + token,
        },
    };
    window.Echo.join("chat")
        .here((users) => {
            console.log(" IN HERE INSIDE ECHOHELPERS CHAT");
            console.log(users);
        })
        .joining((user) => {
            const headersObj = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            // axios.get(`/api/online/${user.id}`, headersObj, {
            //     withCredentials: true
            // });
        })
        .leaving((user) => {
            const headersObj = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            console.log("IN LEAVING ");
            // axios.get(`/api/offline/${user.id}`, headersObj, {
            //     withCredentials: true
            // });
        });
};
