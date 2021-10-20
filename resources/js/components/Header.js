import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <>
            {/* <Jumbotron> */}
            <header>
                <div>
                    <Link to="/">
                        <h1>BoobleChat</h1>
                    </Link>
                </div>
                <div>
                    <ListGroup
                        horizontal
                        className="d-flex "
                        style={{ backgroundColor: "mediumaquamarine" }}
                    >
                        <ListGroup.Item variant="primary">
                            <Link to="/chats" className="text-decoration-none">
                                Комнаты чата
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item variant="primary">
                            <Link to="/users" className="text-decoration-none">
                                Информация о пользователях
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item variant="primary">
                            <Link
                                to="/profile"
                                className="text-decoration-none"
                            >
                                Профиль пользователяx
                            </Link>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </header>
            {/* </Jumbotron> */}
        </>
    );
};
