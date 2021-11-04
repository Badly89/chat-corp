import axios from "axios";

import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
} from "./types";

const getUsersRequest = () => ({
  type: GET_USERS_REQUEST,
});

const getUsersSucces = (infoNasa) => ({
  type: GET_USERS_SUCCESS,
  infoNasa,
});

const getUsersFailure = (err) => ({
  type: GET_USERS_FAILURE,
  error: err,
});

export const getUserInfo = () => async (dispatch) => {
  try {
    dispatch(getUsersRequest());
    const res = await axios.get("http://jsonplaceholder.typicode.com/users");
    console.log(res.data);
    dispatch(getUsersSucces(res.data));
  } catch (err) {
    console.log(err);
    dispatch(getUsersFailure(err));
  }
};
