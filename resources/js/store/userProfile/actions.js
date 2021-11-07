import axios from "axios";
import {
    GET_PROFILE_FAILURE,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
} from "./types";

export const getProfileRequest = () => {
    {
        type: GET_PROFILE_REQUEST;
    }
};
export const getProfileSuccess = () => ({
    type: GET_PROFILE_SUCCESS,
    profile,
});
export const getProfileFailure = () => ({
    type: GET_PROFILE_FAILURE,
    error: err,
});

export const getUserProfile = (token) => (dispantch) => {};
