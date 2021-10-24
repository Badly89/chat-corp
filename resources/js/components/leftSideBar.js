import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import { CallList } from "./callList";
import { ChatList } from "./chatList";
import { FriendsList } from "./friendsList";
import { UserProfile } from "./userProfile";

export const LeftSideBar = () => {
    return (
        <div>
            <div>
                <BrowserRouter>
                    <ListGroup
                        className="d-flex "
                        style={{ backgroundColor: "mediumaquamarine" }}
                    >
                        <ListGroup.Item variant="primary">
                            <Link to="/chats" className="text-decoration-none">
                                Чаты
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item variant="primary">
                            <Link
                                to="/friends"
                                className="text-decoration-none"
                            >
                                Список друзей
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item variant="primary">
                            <Link
                                to="/profile"
                                className="text-decoration-none"
                            >
                                Профиль
                            </Link>
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
            </div>
        </div>
    );
};
