import React from "react";
import { SideBar } from "./SideBar/SideBar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ListChats } from "./ChatList/ListChats";
import { FieldMessages } from "./FieldMessage/FieldMessages";
import { UserProfile } from "./userProfile";
import { ListFriends } from "./ListFriends/ListFriends";
import { ListCalls } from "./Calls/ListCalls";

export const MainContainer = () => {
    return (
        <>
            <BrowserRouter>
                <SideBar />
                <ListChats />

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
            </BrowserRouter>
        </>
    );
};
