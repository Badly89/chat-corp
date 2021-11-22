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
                messages: {
                    ...state.messages,
                    [action.payload.channel_id]: [
                        ...(state.messages[action.payload.channel_id] || []),
                        action.payload.content,
                    ],
                },
            };
        }
        case GET_MESSAGES_REQUEST: {
            console.log("check");
            return {
                ...state,
                offset: false,
                messages: action.payload,
            };
        }
        case GET_MESSAGES_SUCCESS: {
            return {
                ...state,
                offset: true,
            };
        }
        case GET_MESSAGES_FAIL: {
            return {
                ...state,
                offset: false,
            };
        }
        case UPDATE_MESSAGES: {
            const oldMessages = state.messages[action.payload.channel_id];
            const newMessages = oldMessages.filter(
                (item) => item.id !== msg.id
            );
            console.log(oldMessages);
            console.log(newMessages);
            return {
                ...state,
                messages: {
                    ...state.messages,
                    ...(newMessages || []),
                },
            };
        }

        case DEL_MESSAGE: {
            const msg = action.payload.content;
            const arr = state.messages[action.payload.channel_id];
            const filterMessage = arr.filter((item) => item.id !== msg.id);

            return {
                ...state,
                content: {
                    ...state.messages,
                    [action.payload.channel_id]: [...(filterMessage || [])],
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
