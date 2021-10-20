import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./Header";
import Container from "react-bootstrap/Container";
import { Main } from "./Main";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export const Routes = () => {
    return (
        <>
            <BrowserRouter>
                <ListGroup>
                    <ListGroupItem>
                        <Header />
                    </ListGroupItem>
                </ListGroup>
                <ListGroupItem>
                    <Main />
                </ListGroupItem>
            </BrowserRouter>
        </>
    );
};
