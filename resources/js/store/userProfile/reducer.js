import {
    GET_PROFILE_FAILURE,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    USER_UPDATE,
} from "./types";

const initialState = {
    profile: {},
    token: "",
    request: {
        loading: false,
        error: null,
    },
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE_REQUEST: {
            return {
                ...state,
                request: {
                    token: action.payload.token,
                    erorr: null,
                    loading: true,
                },
            };
        }
        case GET_PROFILE_SUCCESS: {
            return {
                ...state,
                token: action.payload.token,
                userProfile: action.payload.Profile,
                request: { error: null, loading: false },
            };
        }
        case GET_PROFILE_FAILURE: {
            return {
                ...state,
                request: { error: action.erorr, loading: false },
            };
        }
        case USER_UPDATE:
            return {
                ...state,
                currUser: {
                    ...state.currUser,
                    name: action.payload.name,
                    email: action.payload.description,
                    description: action.payload.description,
                },
            };
        default:
            return state;
    }
};
