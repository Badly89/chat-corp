import Pusher from "pusher-js";
import Echo from "laravel-echo";
const token = localStorage.getItem("auth_token");
export const connectEcho = {
    broadcaster: "pusher",
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    forceTLS: true,
    encrypted: true,
    // authEndpoint: "/broadcasting/auth",
    auth: {
        headers: {
            Authorization: "Bearer" + token,
            Accept: "application/json",
        },
    },
    csrfToken: document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content"),
};

//  broadcaster: "pusher",
//         key: process.env.MIX_PUSHER_APP_KEY,
//         wsHost: process.env.MIX_WS_HOST_URL,
//         wsPort: 6001,
// 	    wssPort: 6001,
//         disableStats: true,
//         forceTLS: false,
//         authEndpoint: process.env.MIX_AUTH_ENDPOINT,
