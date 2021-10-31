import React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { logout } from "../store/auth/actions";
// import { Redirect } from "react-router-dom";
// import { useSelector } from "react-redux";

export const UserProfile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const handleLogOut = (e) => {
        e.preventDefault();

        dispatch(logout());

        // <Redirect to="/" />;
    };
    if (!currentUser) {
        return <Redirect to="/" />;
    }
    return (
        <>
            <div>Профиль юзера</div>
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>{currentUser.user.name}</strong>
                    </h3>
                </header>
                <p>
                    {/* <strong>Token:</strong>
                    {currentUser.token.substring(0, 20)}
                    {currentUser.token.substr(currentUser.token.length - 20)} */}
                </p>
                <p>
                    <strong>Id:</strong> {currentUser.user.id}
                </p>
                <p>
                    <strong>Email:</strong> {currentUser.user.email}
                </p>
                <strong>Authorities:</strong>
                <ul>
                    {currentUser.roles &&
                        currentUser.roles.map((role, index) => (
                            <li key={index}>{role}</li>
                        ))}
                </ul>
            </div>
            <Form onSubmit={handleLogOut}>
                <Button type="summit">LogOut</Button>
            </Form>
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
