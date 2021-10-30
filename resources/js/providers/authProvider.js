import axios from "axios";

const API_URL = "http://chat-corp/api/";

const register = (name, email, password, password_confirmation) => {
    return axios.post(API_URL + "add_user", {
        name,
        email,
        password,
        password_confirmation,
    });
};

const login = (email, password) => {
    return axios
        .post(API_URL + "login", {
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
