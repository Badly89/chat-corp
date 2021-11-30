import axios from "axios";
import {
    GET_PROFILE_FAILURE,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    USER_UPDATE,
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

export const getUserProfile = () => (dispatch, getState) => {
    axios.get("/profile", { withCredentials: true }).then((res) => {
        console.log(res.data);
    });
};

export const updateInfo = (currUser) => (dispatch, getState) => {
    axios
        .post(`/users/update/${currUser}`)
        .then(
            (res) => console.log(res.data)
            // dispatch({type:USER_UPDATE, payload: res.data}),
        )
        .catch((err) => {
            console.log(err.response);
        });
};
