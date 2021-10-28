import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BrowserRouter, Link, Switch, Route, NavLink } from "react-router-dom";

import "../../style/main-style.css";
import { ListCalls } from "../Calls/ListCalls";

import { FieldMessages } from "../FieldMessage/FieldMessages";
import { ListFriends } from "../ListFriends/ListFriends";
import { UserProfile } from "../userProfile";

export const SideBar = () => {
    return (
        <BrowserRouter>
            <div className="sideBar">
                <Link
                    to="/"
                    className="d-block p-3 link-dark text-decoration-none"
                >
                    <img src="/image/logo.png" alt="Логотип" />
                </Link>

                <div className="wrap">
                    <div>
                        <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                            <li className="nav-item">
                                <Link
                                    to="/chats"
                                    className="nav-link py-3
                                    border-bottom"
                                    aria-current="page"
                                    title=""
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="right"
                                    data-bs-original-title="chats"
                                >
                                    <i className="far fa-comment-dots"></i>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/calls"
                                    className="nav-link py-3 border-bottom"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="right"
                                    data-bs-original-title="calls"
                                >
                                    <i className="fas fa-phone"></i>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/friends"
                                    className="nav-link py-3 border-bottom"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="right"
                                    data-bs-original-title="friends"
                                >
                                    <i className="fas fa-user-friends"></i>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/profile"
                                    className="nav-link py-3 border-bottom"
                                    title=""
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="right"
                                    data-bs-original-title="profile"
                                >
                                    <i className="far fa-user-circle"></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="dropdown border-top"></div>
            </div>
            <Switch>
                <Route exact path="/chats">
                    <Lis />
                </Route>
                <Route exact path="/chats/:chatId">
                    <ListRooms />
                    <FieldMessages />
                </Route>
                <Route exact path="/calls">
                    <ListCalls />
                </Route>
                <Route exact path="/friends">
                    <ListFriends />
                </Route>
                <Route exact path="/profile">
                    <UserProfile />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};
