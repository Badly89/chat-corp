import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { FaSignOutAlt } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { ListGroup } from "react-bootstrap";
import { logout } from "../../store/auth/actions";
import "./style-profile.css";
export const UserProfile = () => {
    const { currUser } = useSelector((state) => state.auth.currUser);
    const isAuthenticated = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    const currDate = new Date();

    const handleLogOut = (e) => {
        e.preventDefault();
        dispatch(logout());
        history.push("/login");
    };

    return (
        <>
            <div className="row g-0">
                <div className="col-6 main-bg">
                    <header className="header-info-user border">
                        <div>
                            <h2>Профиль</h2>
                            <h5>Персональная информация и параметры</h5>
                        </div>
                    </header>

                    <div className="content-info-user border">
                        <div className="container">
                            <div className="wrap">
                                <div className="text-center">
                                    <div className="user-name">
                                        <div className="user-avatar-name">
                                            <img
                                                src="/image/photo.png"
                                                alt="avatar"
                                                className="avatar"
                                            />
                                            <h3>{currUser.name}</h3>
                                        </div>
                                        <i className="fas fa-ellipsis-v"></i>
                                    </div>

                                    <Form onSubmit={handleLogOut}>
                                        <Button
                                            className="button"
                                            type="summit"
                                            variant="outline-danger"
                                        >
                                            <MdExitToApp />
                                            LogOut
                                        </Button>
                                    </Form>
                                </div>
                            </div>

                            <div className="wrap-info-user">
                                <div className="info-user">
                                    <ListGroup className="list-group">
                                        <ListGroup.Item className="list-group-item">
                                            <div className="d-flex flex-column">
                                                <span>Локальное время</span>
                                                <span className="text-muted small">
                                                    20:00
                                                </span>
                                            </div>
                                            <i className="far fa-clock"></i>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="list-group-item">
                                            <div className="d-flex flex-column">
                                                <span>Дата рождения</span>
                                                <span className="text-muted small">
                                                    20/11/1992
                                                </span>
                                            </div>
                                            <i className="far fa-calendar-minus"></i>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="list-group-item">
                                            <div className="d-flex flex-column">
                                                <span>Телефон</span>
                                                <span className="text-muted small">
                                                    +71234567890
                                                </span>
                                            </div>
                                            <i className="fas fa-phone"></i>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="list-group-item">
                                            <div className="d-flex flex-column">
                                                <span>Email</span>
                                                <span className="text-muted small">
                                                    test@mail.ru
                                                </span>
                                            </div>
                                            <i className="far fa-envelope"></i>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="list-group-item">
                                            web site
                                        </ListGroup.Item>
                                        <ListGroup.Item className="list-group-item">
                                            Адрес
                                        </ListGroup.Item>
                                    </ListGroup>
                                </div>
                            </div>
                            <div className="wrap-social-user">
                                <div className="info-user">
                                    <ListGroup className="list-group">
                                        <ListGroup.Item className="list-group-item">
                                            Facebook
                                        </ListGroup.Item>
                                        <ListGroup.Item className="list-group-item">
                                            Twitter
                                        </ListGroup.Item>
                                        <ListGroup.Item className="list-group-item">
                                            Instagram
                                        </ListGroup.Item>
                                        <ListGroup.Item className="list-group-item">
                                            Linkedin
                                        </ListGroup.Item>
                                    </ListGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-6">
                    <header>
                        <div>
                            <h1>Параметры</h1>
                            <h3>
                                Изменение персональной информации и параметров
                            </h3>
                        </div>
                    </header>
                </div>
            </div>
        </>
    );
};

{
    /* <div className="d-flex flex-column ">
                <h1>Профиль юзера</h1>
                <div className="container">
                    <p>
                        <strong>Name:</strong>
                    </p>
                    <p>
                        <strong>Id:</strong> {currUser.id}
                    </p>
                    <p>
                        <strong>Email:</strong> {currUser.email}
                    </p>
                </div>
            </div> */
}
