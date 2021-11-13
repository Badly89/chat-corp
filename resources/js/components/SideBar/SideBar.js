import React, { useEffect, useState } from "react";
import { Router, Link, Switch, Route, useHistory } from "react-router-dom";
import { ListFriends } from "../ListFriends/ListFriends";
import { UserProfile } from "../Profile/userProfile";
import { useDispatch, useSelector } from "react-redux";
import { ChatContainer } from "../ChatContainer";
import { ListChannels } from "../Channels/ListChannels";
import { Spinner } from "react-bootstrap";
import { getAllChannelList } from "../../store/channels/actions";

export const SideBar = () => {
    const history = useHistory();
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllChannelList());
        setLoading(false);
    }, []);
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
                                        <i className="far fa-comment-dots"></i>
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
                                        to="/userProfile"
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
                    <Route
                        exact
                        path="/channels"
                        isLoading={isLoading}
                        component={ListChannels}
                    />

                    <Route
                        exact
                        path="/channels/:channelId"
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
