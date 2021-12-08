import React from "react";
import { Router, Link, Switch, Route, useHistory } from "react-router-dom";
import { ListFriends } from "../ListFriends/ListFriends";
import { UserProfile } from "../Profile/userProfile";
import { ChatContainer } from "../ChatContainer";
import { ListChannels } from "../Channels/ListChannels";
import {
    FaRegCommentDots,
    FaRegUserCircle,
    FaUserFriends,
} from "react-icons/fa";

export const SideBar = () => {
    const history = useHistory();

    return (
        <div className=" main-window">
            <Router history={history}>
                <div className="sideBar">
                    <Link
                        to="/"
                        className="d-block p-3 link-dark text-decoration-none"
                    >
                        <img src="/image/logo.png" alt="Логотип" />
                    </Link>

                    <div className="wrap-sidebar">
                        <div>
                            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                                <li className="nav-item">
                                    <Link
                                        to="/channels"
                                        className="nav-link py-3
                                    border-bottom"
                                        aria-current="page"
                                        title=""
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        data-bs-original-title="chats"
                                    >
                                        <FaRegCommentDots className="svg-icon" />
                                        {/* <i className="far fa-comment-dots"></i> */}
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
                                        <FaUserFriends className="svg-icon" />
                                        {/* <i className="fas fa-user-friends"></i> */}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/userProfile"
                                        className="nav-link py-3 border-bottom"
                                        title=""
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        data-bs-original-title="profile"
                                    >
                                        <FaRegUserCircle className="svg-icon" />
                                        {/* <i className="far fa-user-circle"></i> */}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="dropdown border-top"></div>
                </div>

                <Switch>
                    <Route exact path="/channels" component={ListChannels} />

                    <Route
                        path="/channels/:channel_id/:title"
                        component={ChatContainer}
                    />

                    {/* <Route exact path="/calls">
                        <ListCalls />
                    </Route> */}
                    <Route exact path="/friends">
                        <ListFriends />
                    </Route>
                    <Route exact path="/userProfile">
                        <UserProfile />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};
