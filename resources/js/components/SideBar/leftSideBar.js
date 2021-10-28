import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import { CallList } from "../callList";
import { ChatList } from "../ChatList/chatList";
import { FriendsList } from "../friendsList";
import { UserProfile } from "../userProfile";

import "../../style/main-style.css";

export const LeftSideBar = () => {
    return (
        <BrowserRouter>
            <div className="sideBar">
                <Link
                    to="/"
                    className="d-block p-3 link-dark text-decoration-none"
                    title=""
                >
                    <img src="/image/logo.png" alt="Логотип" />
                </Link>
                <div className="wrap">
                    <div>
                        <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                            <li className="nav-item">
                                <a
                                    href="#"
                                    className="nav-link py-3 border-bottom"
                                    aria-current="page"
                                    title=""
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="right"
                                    data-bs-original-title="chats"
                                >
                                    <i className="far fa-comment-dots"></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="nav-link py-3 border-bottom"
                                    title=""
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="right"
                                    data-bs-original-title="calls"
                                >
                                    <i className="fas fa-phone"></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="nav-link py-3 border-bottom"
                                    title=""
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="right"
                                    data-bs-original-title="friends"
                                >
                                    <i className="fas fa-user-friends"></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="nav-link py-3 border-bottom"
                                    title=""
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="right"
                                    data-bs-original-title="profile"
                                >
                                    <i className="far fa-user-circle"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="dropdown border-top"></div>
            </div>
        </BrowserRouter>
    );
};
