import {
    CREATE_CHANNEL,
    DELETE_CHANNEL,
    GET_ALL_CHANNELS,
    GET_CHANNELS,
} from "./types";

const initialRoom = {
    channel: [],
    // channel: [{ id: "id0", name: "Главный канал" }],
    allChannels: [],
    channels: [],
};

export const channelReducer = (state = initialRoom, action) => {
    switch (action.type) {
        case CREATE_CHANNEL: {
            return {
                ...state,
                channel: [
                    ...state.channel,
                    {
                        name: action.payload,
                        id: `id${state.channel.length + 1}`,
                    },
                ],
            };
        }
        case DELETE_CHANNEL: {
            return {
                ...state,
                channel: [
                    ...state.channel.filter(
                        (item) => item.id !== action.payload
                    ),
                ],
            };
        }

        case GET_ALL_CHANNELS: {
            return {
                ...state,
                allChannels: action.payload,
            };
        }

        default:
            return state;
    }
};
