import {
    SEND_MESSAGE,
    DEL_MESSAGE,
    UPDATE_MESSAGES,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAIL,
    GET_MESSAGES_REQUEST,
    CLEAR_MESSAGES,
    ADD_MESSAGE,
    ADD_TYPING_EVENT,
    REMOVE_TYPING_EVENT,
} from "./types";

const initialMessage = {
    content: {},
    messages: [],
    loadMessages: [],
    offset: false,
    typings: [],
};

export const msgReducer = (state = initialMessage, action) => {
    switch (action.type) {
        case SEND_MESSAGE:

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

        case DEL_MESSAGE:

        case ADD_MESSAGE: {
            console.log("Добавление сообщения");
            console.log(action.payload);
            return {
                ...state,
                messages: state.messages.concat(action.payload),
            };
        }
        case CLEAR_MESSAGES: {
            return { ...state, messages: {} };
        }
        case ADD_TYPING_EVENT:
            console.log(action.payload);
            let isFound = state.typings.find(
                (typing) => typing.user.id === action.payload.user.id
            );
            return {
                ...state,
                typings: isFound
                    ? state.typings
                    : state.typings.concat(action.payload),
            };
        case REMOVE_TYPING_EVENT:
            console.log(action.payload);
            return {
                ...state,
                typings: state.typings.filter(
                    (typing) => typing.user.id !== action.payload.user.id
                ),
            };
        default:
            return state;
    }
};
