import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "../hocs/PrivateRoute";
import PublicRoute from "../hocs/PublicRoute";
import { FormLogin } from "./authorized/Login/FormLogin";
import { FormRegister } from "./authorized/Register/FormRegister";
import { SideBar } from "./SideBar/SideBar";
import { UserProfile } from "../components/Profile/userProfile";

import { FormResetPassword } from "./authorized/ResetPassword/FormResetPassword";
import "../components/asset/css/main-style.css";
import "../components/asset/css/auth-style.css";
import "../components/asset/css/style-profile.css";

import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.get["Accept"] = "application/json";
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("auth_token");

    config.headers.Authorization = token ? `Bearer ${token}` : "";

    return config;
});
axios.defaults.withCredentials = true;
export const Routes = () => {
    const [loading, setLoading] = useState(true);
    const [authed, setAuth] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            setAuth(true);
            setLoading(false);
        } else {
            setAuth(false);
            setLoading(false);
        }
    });

    return (
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
                <PublicRoute
                    isAuthenticated={authed}
                    path="/reset"
                    component={FormResetPassword}
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
