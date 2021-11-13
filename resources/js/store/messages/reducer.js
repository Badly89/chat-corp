import { AUTHORS } from "../../utils/constant";
import {
    SEND_MESSAGE,
    DEL_MESSAGE,
    GET_MESSAGES,
    LOAD_MESSAGES,
    UPDATE_MESSAGES,
} from "./types";

const initialMessage = {
    messages: {},
};

export const msgReducer = (state = initialMessage, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.channelId]: [
                        ...(state.messages[action.payload.channelId] || []),
                        action.payload.message,
                    ],
                },
            };
        }
        case LOAD_MESSAGES: {
            const msg = action.payload.message;
            const arr = state.messages[action.payload.channelId];
            const filterMessage = arr.filter((item) => item.id == msg.id);
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.channelId]: [
                        ...state.messages[action.payload.channelId],
                        action.payload.message,
                    ],
                },
            };
        }
        case UPDATE_MESSAGES: {
            const updateItems = state.messages[action.payload.channelId].map(
                (item) => {
                    if (item.id === action.id) {
                        console.log(item);
                    }
                }
            );
            return {};
        }

        case DEL_MESSAGE: {
            const msg = action.payload.message;
            const arr = state.messages[action.payload.channelId];
            const filterMessage = arr.filter((item) => item.id !== msg.id);

            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.channelId]: [...(filterMessage || [])],
                },
            };
        }

        default:
            return state;
    }
};
