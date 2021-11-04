import {
    GET_PROFILE_FAILURE,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
} from "./types";

const initialState = {
    profile: {},
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
                    erorr: null,
                    loading: true,
                },
            };
        }
        case GET_PROFILE_SUCCESS: {
            return {
                ...state,
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
        default:
            return state;
    }
};
