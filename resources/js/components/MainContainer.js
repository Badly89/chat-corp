import React from "react";
<<<<<<< HEAD
import { SideBar } from "./SideBar/SideBar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ListChats } from "./ChatList/ListChats";
import { FieldMessages } from "./FieldMessage/FieldMessages";
import { UserProfile } from "./userProfile";
import { ListFriends } from "./ListFriends/ListFriends";
=======
import { LeftSideBar } from "./SideBar/LeftSideBar";
import { ListRooms } from "./Rooms/ListRooms";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { FieldMessage } from "./FieldMessage/MessagesContainer";
import { UserProfile } from "./userProfile";
import { ListFriends } from "./ListFriends";

>>>>>>> 9cfd6e94e81639ea53e7d5247d5e997579dc9a9c
import { ListCalls } from "./Calls/ListCalls";

export const MainContainer = () => {
    return (
        <>
<<<<<<< HEAD
            <div className=" main-window">
                <BrowserRouter>
                    <SideBar />

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
            </div>
=======
            {/* <div className="main-window"> */}
            <LeftSideBar />
            <ListRooms />
            <Switch>
                <Route exact path="/" />
                <Route exact path="/chats/:chatId">
                    <FieldMessage />
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
            {/* </div> */}
>>>>>>> 9cfd6e94e81639ea53e7d5247d5e997579dc9a9c
        </>
    );
};
