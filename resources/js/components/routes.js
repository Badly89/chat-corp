import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "../style/main-style.css";

import { FieldMessages } from "./FieldMessage/FieldMessages";
import { UserProfile } from "./userProfile";
import { ListFriends } from "./ListFriends/ListFriends";
import { ListCalls } from "./Calls/ListCalls";
import { SideBar } from "./SideBar/SideBar";

export const Routes = () => {
    // const isAuth = false;
    return (
        <>
            <BrowserRouter>
                <div className=" main-window">
                    <SideBar />

                    <Switch>
                        <Route exact path="/chats/:chatId">
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
                    </Switch>
                </div>
            </BrowserRouter>
        </>
    );
};
