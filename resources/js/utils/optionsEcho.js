import Pusher from "pusher-js";

const token = localStorage.getItem("auth-token");
export const options = {
    broadcaster: "pusher",
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    forceTLS: true,
    encrypted: true,
    // authEndpoint: process.env.MIX_AUTH_ENDPOINT + "/broadcasting/auth",
    auth: {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    },
};
