import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "../style/main-style.css";
import { MainContainer } from "./MainContainer";

export const Routes = () => {
    // const isAuth = false;
    return (
        <>
            <div className=" main-window">
                <BrowserRouter>
                    <MainContainer />
                </BrowserRouter>
            </div>
        </>
    )

};
