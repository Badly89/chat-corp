import React, { useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";
import "../style/main-style.css";
import "../style/style.css";
import { logout } from "../store/auth/actions";
import { FieldMessages } from "./FieldMessage/FieldMessages";
import { UserProfile } from "./userProfile";
import { ListFriends } from "./ListFriends/ListFriends";
import { ListCalls } from "./Calls/ListCalls";
import { SideBar } from "./SideBar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { FormLogin } from "./authorized/Login/FormLogin";
import { history } from "../helpers/history";
import { FormRegister } from "./authorized/Register/FormRegister";
import { ListChats } from "./Rooms/ListChats";

export const Routes = () => {
    const { user: currentUser } = useSelector((state) => state.auth);

    const dispatch = useDispatch;
    //очистка сообщений

    const logOut = () => {
        dispatch(logout());
    };

    return (
        <>
            <Router history={history}>
                {currentUser ? <SideBar /> : <FormLogin />}
                {/* <Switch>
                    <Route exact path="/chats/:chatId">
                        <ListChats />
                        <FieldMessages />
                    </Route>
                    <Route exact path="/profile">
                        <UserProfile />
                    </Route>
                    <Route exact path="/friends">
                        <ListFriends />
                    </Route>
                    <Route exact path="/calls">
                        <ListCalls />
                    </Route>
                    <Route exact path="/login">
                        <FormLogin />
                    </Route>
                    <Route exact path="/register">
                        <FormRegister />
                    </Route>
                </Switch> */}
            </Router>
        </>
    );
};
