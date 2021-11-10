import { CREATE_CHANNEL, DELETE_CHANNEL } from "./types";

const initialRoom = {
    channel: [{ id: "id0", name: "Главный канал" }],
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

        default:
            return state;
    }
};
