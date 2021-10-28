import { AUTHORS } from "../../utils/constant";
import { SEND_MESSAGE, DEL_MESSAGE } from "./types";

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
                    [action.payload.chatId]: [
                        ...(state.messages[action.payload.chatId] || []),
                        action.payload.message,
                    ],
                },
            };
        }
        case DEL_MESSAGE: {
            const msg = action.payload.message;
            const arr = state.messages[action.payload.chatId];
            const filterMessage = arr.filter((item) => item.id !== msg.id);

            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.chatId]: [...(filterMessage || [])],
                },
            };
        }
        default:
            return state;
    }
};
