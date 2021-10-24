import React from "react";
import { LeftSideBar } from "./SideBar/leftSideBar";
import { ChatList } from "./ChatList/chatList";
import { FieldMessage } from "./FieldMessage/Messages";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UserProfile } from "./userProfile";
import { FriendsList } from "./friendsList";
import { CallList } from "./callList";
import "../style/main-style.css";

export const Routes = () => {
    // const isAuth = false;
    return (
        <>
            <div className=" main-window">
                <BrowserRouter>
                    <LeftSideBar />
                    <ChatList />

                    <Switch>
                        <Route exact path="/chats/:chatId">
                            <FieldMessage />
                        </Route>
                        <Route exact path="/profile">
                            <UserProfile />
                        </Route>
                        <Route exact path="/friends">
                            <FriendsList />
                        </Route>
                        <Route exact path="/calls">
                            <CallList />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        </>
    );
};
