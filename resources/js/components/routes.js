import React from "react";
import { LeftSideBar } from "./leftSideBar";
import { ChatList } from "./chatList";
import { FieldMessage } from "./fieldMessage";
import { ListGroup } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UserProfile } from "./userProfile";
import { FriendsList } from "./friendsList";
import { CallList } from "./callList";
export const Routes = () => {
    return (
        <>
            <BrowserRouter>
                <ListGroup horizontal>
                    <ListGroup.Item>
                        <LeftSideBar />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <ChatList />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <FieldMessage />
                    </ListGroup.Item>
                </ListGroup>

                <Switch>
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
                </Switch>
            </BrowserRouter>
        </>
    );
};
