import Pusher from "pusher-js";
import Echo from "laravel-echo";
import { IS_OFFLINE, IS_ONLINE } from "../store/channels/types";

export const connectEcho = (token) => {
    window.Echo = new Echo({
        broadcaster: "pusher",
        key: process.env.MIX_PUSHER_APP_KEY,
        cluster: process.env.MIX_PUSHER_APP_CLUSTER,
        forceTLS: true,
        encrypted: true,
        // authEndpoint: "/broadcasting/auth",
        auth: {
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json",
            },
        },
        csrfToken: document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
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
            console.log(user);
            axios.get(`/online/${user.id}`, headersObj, {
                withCredentials: true,
            });
        })
        .leaving((user) => {
            const headersObj = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            console.log(user);
            console.log("IN LEAVING ");
            axios.get(`/offline/${user.id}`, headersObj, {
                withCredentials: true,
            });
        })
        .listen("UserOnline", (event) => {
            console.log(event.user.name + " IS ONLINE ");
            console.log(event.user);
            store.dispatch({ type: IS_ONLINE, payload: event.user.id });
        })
        .listen("UserOffline", (event) => {
            console.log(event.user.name + " IS OFFLINE ");
            console.log(event.user);
            store.dispatch({ type: IS_OFFLINE, payload: event.user.id });
        });
};

export const sendMessage = (channel_id, content) => {
    const body = JSON.stringify({ channel_id, content });
    console.log(body);
    axios
        .post("/sendMessage", body, {
            withCredentials: true,
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            const errors = err.response.data.errors;
            console.log(errors);
        });
};
