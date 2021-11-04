import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
} from "./types";

const initialState = {
  list: [],
  request: {
    loading: false,
    error: null,
  },
};
export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST: {
      return {
        ...state,
        request: {
          error: null,
          loading: true,
        },
      };
    }
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        list: action.infoNasa,
        request: {
          error: null,
          loading: false,
        },
      };
    }
    case GET_USERS_FAILURE: {
      return {
        ...state,
        request: {
          error: action.error,
          loading: false,
        },
      };
    }
    default:
      return state;
  }
};
