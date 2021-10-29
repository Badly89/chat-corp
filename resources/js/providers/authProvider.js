import axios from "axios";

const API_URL = "http://chat-corp/api/";

const register = (name, email, password) => {
    return axios.post(API_URL + "create-account", {
        name,
        email,
        password,
        password_confirmation,
    });
};

const login = (email, password) => {
    return axios
        .post(API_URL + "signin", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    login,
    logout,
};
