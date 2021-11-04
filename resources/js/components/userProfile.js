import axios from "axios";
import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { history } from "../helpers/history";
import { logout } from "../store/auth/actions";
import { getUserProfile } from "../store/userProfile/actions";

export const UserProfile = () => {
    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    // const { currUser: user } = useSelector((state) => state.auth.currUser);
    const { profile: userInfo } = useSelector(
        (state) => state.userProfile.profile
    );
    const error = useSelector((state) => state.userProfile.request.error);
    const loading = useSelector((state) => state.userProfile.request.loading);
    const { currUser: user } = useSelector((state) => state.auth.currUser);
    const dispatch = useDispatch();
    console.log(user);
    console.log(userInfo);

    const requestUser = () => {
        dispatch(getUserProfile);
    };
    useEffect(() => {
        requestUser();
    }, []);

    const handleLogOut = (e) => {
        e.preventDefault();

        dispatch(logout());

        // <Redirect to="/" />;
    };
    // if (!isAuthenticated) {
    //     <Redirect to="/" />;
    // }
    // axios.get("/sanctum/csrf-cookie").then((respone) => {

    return (
        <>
            <h2>Профиль Юзера</h2>
            {/* {userInfo?.map((info) => ( */}
            <div className="d-flex flex-column ">
                <h1>Профиль юзера</h1>
                <div className="container">
                    <p>
                        <strong>Name:</strong>
                        {/* {info.name} */}
                    </p>
                    <p>{/* <strong>Id:</strong> {info.id} */}</p>
                    <p>{/* <strong>Email:</strong> {info.email} */}</p>
                </div>
                <Form onSubmit={handleLogOut}>
                    <Button type="summit">LogOut</Button>
                </Form>
            </div>
            {/* ))} */}
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
