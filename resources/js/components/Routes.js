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
import { ListChats } from "./Rooms/ListChats";
import { SideBar } from "./SideBar/SideBar";
import { UserProfile } from "./userProfile";

export const Routes = () => {
    const [loading, setLoading] = useState(false);
    const [authed, setAuth] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
        if (currentUser) {
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
                    authenticated={authed}
                    path="/login"
                    component={FormLogin}
                />
                <PrivateRoute
                    path="/"
                    authenticated={authed}
                    component={SideBar}
                />
                <PrivateRoute
                    path="/profile"
                    authenticated={authed}
                    component={UserProfile}
                />

                {/* <PublicRoute
                    authenticated={authed}
                    path="/register"
                    component={FormRegister}
                /> */}
                {/* <PublicRoute
                    path="/register"
                    authenticated={authed}
                    component={FormRegister}
                /> */}
                {/* <PublicRoute
                    authenticated={authed}
                    path="/login"
                    component={FormLogin}
                /> */}
            </Switch>
        </Router>
    );
};
