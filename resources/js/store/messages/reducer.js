import { AUTHORS } from "../../utils/constant";
import {
    SEND_MESSAGE,
    DEL_MESSAGE,
    GET_MESSAGES,
    LOAD_MESSAGES,
    UPDATE_MESSAGES,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAIL,
    GET_MESSAGES_REQUEST,
    CLEAR_MESSAGES,
} from "./types";

const initialMessage = {
    content: {},
    messages: [],
    loadMessages: [],
    offset: false,
};

export const msgReducer = (state = initialMessage, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            return {
                ...state,
                message: {
                    ...state.messages,
                    [action.payload.channelId]: [
                        ...(state.messages[action.payload.channelId] || []),
                        action.payload.message,
                    ],
                },
            };
        }
        case GET_MESSAGES_REQUEST: {
            return {
                ...state,
                offset: false,
                messages: {
                    ...state.messages,
                    [action.payload.channelId]: [
                        ...(state.messages[action.payload.channelId] || []),
                        action.payload.message,
                    ],
                },
            };
        }
        case GET_MESSAGES_SUCCESS: {
            return {
                ...state,
                ofset: true,
            };
        }
        case GET_MESSAGES_FAIL: {
            return {
                ...state,
                ofset: false,
            };
        }
        case UPDATE_MESSAGES: {
            const oldMessages = state.messages[action.payload.channelId];
            const newMessages = oldMessages.filter(
                (item) => item.id !== msg.id
            );
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.channelId]: [...(newMessages || [])],
                },
            };
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
        case CLEAR_MESSAGES: {
            return { ...state, messages: {} };
        }
        default:
            return state;
    }
};
