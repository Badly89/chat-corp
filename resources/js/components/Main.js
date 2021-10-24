import React from "react";
import { LeftSideBar } from "./SideBar/leftSideBar";
import { ChatList } from "./ChatList/chatList";
import { FieldMessage } from "./FieldMessage/fieldMessage";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export const MainWindow = () => {
    return (
        <>
            <div className="main-window">
                {/* <Switch>
                    <Route exact path="/chats">
                        <ChatList />
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
                </Switch> */}
            </div>
        </>
    );
};
