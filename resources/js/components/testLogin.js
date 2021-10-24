import React from "react";
import { useSanctum } from "react-sanctum";

const LoginButton = () => {
    const { authenticated, user, signIn } = useSanctum();

    const handleLogin = () => {
        const email = "test22@test.ru";
        const password = "12345678";
        const remember = true;

        signIn(email, password, remember)
            .then(() => window.alert("Signed in!"))
            .catch(() => window.alert("Incorrect email or password"));
    };

    if (authenticated === true) {
        return <h1>Welcome, {user.name}</h1>;
    } else {
        return <button onClick={handleLogin}>Sign in</button>;
    }
};

export default LoginButton;
