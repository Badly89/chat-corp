import React from "react";
import { LeftSideBar } from "./SideBar/SideBar";
import { ChatList } from "./ChatList/ListChats";
import { FieldMessages } from "./FieldMessage/FieldMessages";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UserProfile } from "./userProfile";
import { FriendsList } from "./ListFriends/ListFriends";
import { CallList } from "./Calls/ListCalls";
import "../style/main-style.css";
import { MainContainer } from "./MainContainer";

export const Routes = () => {
    // const isAuth = false;
    return (
        <>
            <MainContainer />
        </>
    );
};
