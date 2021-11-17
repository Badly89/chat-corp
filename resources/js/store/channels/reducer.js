import {
    CLEAR_CHANNELS,
    CREATE_CHANNEL,
    DELETE_CHANNEL,
    GET_ALL_CHANNELS,
    GET_CHANNELS,
} from "./types";

const initialRoom = {
    currChannel: [],
    allChannels: [],
    offset: null,
};

export const channelReducer = (state = initialRoom, action) => {
    switch (action.type) {
        case CREATE_CHANNEL: {
            return {
                ...state,
                allChannels: [
                    ...state.allChannels,
                    {
                        name: action.payload,
                        id: `id${state.allChannels.length + 1}`,
                    },
                ],
            };
        }
        case DELETE_CHANNEL: {
            return {
                ...state,
                currChannel: [
                    ...state.currChannel.filter(
                        (item) => item.id !== action.payload
                    ),
                ],
            };
        }

        case GET_ALL_CHANNELS: {
            return {
                ...state,
                allChannels: action.payload,
                offset: true,
            };
        }
        case CLEAR_CHANNELS: {
            return {
                ...state,
                allChannels: [],
                currChannel: [],
                offset: false,
            };
        }
        default:
            return state;
    }
};
