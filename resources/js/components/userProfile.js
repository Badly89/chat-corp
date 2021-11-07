import axios from "axios";
import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import Swal from "sweetalert2";

import { logout } from "../store/auth/actions";
import { LOGOUT_SUCCESS } from "../store/auth/types";
import { returnStatus } from "../store/status/actions";
import { getUserProfile } from "../store/userProfile/actions";

export const UserProfile = () => {
    const { currUser } = useSelector((state) => state.auth.currUser);
    const isAuthenticated = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();
    const requestUser = () => {
        dispatch(getUserProfile);
    };
    useEffect(() => {
        requestUser();
    }, []);

    const handleLogOut = (e) => {
        e.preventDefault();

        dispatch(logout());
        history.push("/login");
    };
    // if (!isAuthenticated) {
    //     <Redirect to="/" />;
    // }

    return (
        <>
            <div className="d-flex flex-column ">
                <h1>Профиль юзера</h1>
                <div className="container">
                    <p>
                        <strong>Name:</strong>
                        {currUser.name}
                    </p>
                    <p>
                        <strong>Id:</strong> {currUser.id}
                    </p>
                    <p>
                        <strong>Email:</strong> {currUser.email}
                    </p>
                </div>
                <Form onSubmit={handleLogOut}>
                    <Button type="summit" variant="outline-danger">
                        LogOut
                    </Button>
                </Form>
            </div>
        </>
    );
};

// const { user: currentUser } = useSelector((state) => state.auth);

// if (!currentUser) {
//     return <Redirect to="/login" />;
// }

// return (
//     <>
//         <div className="container">
//             <header className="jumbotron">
//                 <h3>
//                     <strong>{currentUser.name}</strong> Profile
//                 </h3>
//             </header>
//             <p>
//                 <strong>Token:</strong>{" "}
//                 {currentUser.accessToken.substring(0, 20)} ...{" "}
//                 {currentUser.accessToken.substr(
//                     currentUser.accessToken.length - 20
//                 )}
//             </p>
//             <p>
//                 <strong>Id:</strong> {currentUser.id}
//             </p>
//             <p>
//                 <strong>Email:</strong> {currentUser.email}
//             </p>
//             <strong>Authorities:</strong>
//             <ul>
//                 {currentUser.roles &&
//                     currentUser.roles.map((role, index) => (
//                         <li key={index}>{role}</li>
//                     ))}
//             </ul>
//         </div>
//     </>
// );
