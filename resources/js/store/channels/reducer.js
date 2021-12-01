import {
    ADD_CHANNEL_USERS,
    CLEAR_CHANNELS,
    CREATE_CHANNEL,
    DELETE_CHANNEL,
    GET_ALL_CHANNELS,
    GET_CHANNELS,
    SET_SELECTED_CHANNEL,
    SET_USERS_IN_ROOM,
} from "./types";

const initialRoom = {
    currChannel: [],
    allChannels: [],
    channels: [],
    usersInRoom: [],
    usersList: [],
};

export const channelReducer = (state = initialRoom, action) => {
    switch (action.type) {
        case CREATE_CHANNEL: {
            console.log("успешное создание канала");
            return {
                ...state,
                channels: state.channels.concat(action.payload),
            };
        }
        case DELETE_CHANNEL: {
            return {
                ...state,
                currChannel: [
                    ...state.channel.filter(
                        (item) => item.id !== action.payload
                    ),
                ],
            };
        }
        case GET_CHANNELS: {
            return {
                ...state,
                channels: action.payload,
            };
        }

        case GET_ALL_CHANNELS: {
            return {
                ...state,
                allChannels: action.payload,
            };
        }
        case CLEAR_CHANNELS: {
            return {
                ...state,
                allChannels: [],
                channels: [],

                offset: false,
            };
        }
        case SET_SELECTED_CHANNEL:
            return {
                ...state,
                currChannel: action.payload,
            };

        case ADD_CHANNEL_USERS:
            return {
                ...state,
                currChannel: {
                    ...state.currChannel,
                    users: action.payload,
                },
            };
        case SET_USERS_IN_ROOM:
            return {
                ...state,
                usersInRoom: action.payload,
            };

        default:
            return state;
    }
};
