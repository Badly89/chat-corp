import React, { useEffect } from "react";
import "../../style/main-style.css";
import "../../style/style.css";
import {
    Router,
    Link,
    Switch,
    Route,
    NavLink,
    useHistory,
} from "react-router-dom";

import { ListChats } from "../Chats/ListChats";
import { FieldMessages } from "../FieldMessage/FieldMessages";
import { ListFriends } from "../ListFriends/ListFriends";
import { UserProfile } from "../Profile/userProfile";

import { useDispatch, useSelector } from "react-redux";
import { FormLogin } from "../authorized/Login/FormLogin";
import { FormRegister } from "../authorized/Register/FormRegister";

export const SideBar = () => {
    const history = useHistory();
    const isAuthenticated = useSelector((state) => state.auth);
    // const { user: currentUser } = useSelector((state) => state.auth.currUser);
    const dispatch = useDispatch();

    if (!isAuthenticated) {
        <Redirect to="/" />;
    }

    //очистка сообщений

    return (
        <div className=" main-window">
            <Router history={history}>
                {/* {currentUser ? ( */}
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
                    <Route exact path="/chats">
                        <ListChats />
                    </Route>
                    <Route exact path="/chats/:chatId">
                        <ListChats />
                        <FieldMessages />
                    </Route>
                    {/* <Route exact path="/calls">
                        <ListCalls />
                    </Route> */}
                    <Route exact path="/friends">
                        <ListFriends />
                    </Route>
                    <Route exact path="/userProfile">
                        <UserProfile />
                    </Route>
                    <Route exact path="/login" component={FormLogin} />
                    <Route exact path="/register" component={FormRegister} />
                </Switch>
            </Router>
        </div>
    );
};
