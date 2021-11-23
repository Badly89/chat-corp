import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

export const options = {
    broadcaster: "pusher",
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    forceTLS: true,
    encrypted: true,
};
