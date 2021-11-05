import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import PrivateRoute from "../hocs/PrivateRoute";
import PublicRoute from "../hocs/PublicRoute";
import { FormLogin } from "./authorized/Login/FormLogin";
import { FormRegister } from "./authorized/Register/FormRegister";
import { ListChats } from "./Chats/ListChats";
import { SideBar } from "./SideBar/SideBar";
import { UserProfile } from "./userProfile";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.get["Accept"] = "application/json";
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("auth_token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    console.log(config);
    return config;
});
axios.defaults.withCredentials = true;

export const Routes = () => {
    const [loading, setLoading] = useState(false);
    const [authed, setAuth] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    console.log(isAuthenticated);
    useEffect(() => {
        if (isAuthenticated) {
            setAuth(true);
            setLoading(false);
        } else {
            setAuth(false);
            setLoading(false);
        }
    });

    return loading === true ? (
        <h2>Загрузка...</h2>
    ) : (
        <Router>
            <Switch>
                <PublicRoute
                    isAuthenticated={authed}
                    path="/login"
                    component={FormLogin}
                />
                <PublicRoute
                    isAuthenticated={authed}
                    path="/register"
                    component={FormRegister}
                />
                <PrivateRoute
                    path="/"
                    isAuthenticated={authed}
                    component={SideBar}
                />
                <PrivateRoute
                    path="/userProfile"
                    isAuthenticated={authed}
                    component={UserProfile}
                />
            </Switch>
        </Router>
    );
};
