import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Col,
    Collapse,
    FloatingLabel,
    Form,
    Row,
    Stack,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { MdExitToApp } from "react-icons/md";
import { MdOutlineEmail, MdInfoOutline } from "react-icons/md";
import { ListGroup } from "react-bootstrap";
import { logout } from "../../store/auth/actions";
import { getUserProfile } from "../../store/userProfile/actions";
import { FaEllipsisV } from "react-icons/fa";
export const UserProfile = () => {
    const { currUser } = useSelector((state) => state.auth.currUser);
    const [updateInput, setUpdate] = useState({
        name: "",
        email: "",
        description: "",
    });
    const dispatch = useDispatch();
    const history = useHistory();
    const [open, setOpen] = useState(false);

    const handleChange = (e) => {
        e.persist();
        setUpdate({ ...updateInput, [e.target.name]: e.target.value });
    };
    const requestUserInfo = () => {
        dispatch(getUserProfile());
    };
    useEffect(() => {}, [currUser]);

    const handleLogOut = (e) => {
        e.preventDefault();
        dispatch(logout());
        history.push("/login");
    };
    const hanleUpdateInfo = (e) => {
        e.preventDefault();
        const data = {
            name: updateInput.name,
            email: updateInput.email,
            description: updateInput.description,
        };
    };

    return (
        <>
            <div className="user-profile">
                <Row grap={2}>
                    <Col md={5}>
                        <div className="main-bg">
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
                                                <Button
                                                    className="btn-setting"
                                                    variant="outline-secondary"
                                                    onClick={() =>
                                                        setOpen(!open)
                                                    }
                                                    aria-expanded={open}
                                                    aria-controls="user-profile-setting"
                                                >
                                                    <FaEllipsisV />
                                                </Button>
                                            </div>

                                            <Form onSubmit={handleLogOut}>
                                                <Button
                                                    variant="outline-danger"
                                                    type="summit"
                                                >
                                                    <MdExitToApp />
                                                    Выход
                                                </Button>
                                            </Form>
                                        </div>
                                    </div>

                                    <div className="wrap-info-user">
                                        <div className="info-user">
                                            <ListGroup className="list-group">
                                                <ListGroup.Item className="list-group-item">
                                                    <div className="d-flex flex-column">
                                                        <span>Email</span>
                                                        <span className="text-muted small">
                                                            {currUser.email}
                                                        </span>
                                                    </div>
                                                    <MdOutlineEmail />
                                                </ListGroup.Item>
                                                <ListGroup.Item className="list-group-item">
                                                    <div className="d-flex flex-column">
                                                        <span>
                                                            Немного о себе
                                                        </span>
                                                        <span className="text-muted small">
                                                            {
                                                                currUser.description
                                                            }
                                                        </span>
                                                    </div>
                                                    <MdInfoOutline />
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <Collapse in={open} dimension="width">
                            <div id="user-profile-setting">
                                <header>
                                    <div>
                                        <h1>Параметры</h1>
                                        <h3>
                                            Изменение персональной информации и
                                            параметров
                                        </h3>
                                    </div>
                                </header>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Акканут</Card.Title>
                                        <Card.Subtitle className="text-start">
                                            Изменения персональной и контактной
                                            информации
                                        </Card.Subtitle>

                                        <Form onSubmit={hanleUpdateInfo}>
                                            <Row>
                                                <Col md={6}>
                                                    <FloatingLabel className="mb-3">
                                                        <Form.Control
                                                            id="name"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            name="name"
                                                            value={
                                                                updateInput.name
                                                            }
                                                            type="text"
                                                            placeholder="Введите ваше имя."
                                                        />
                                                        <Form.Label htmlFor="name">
                                                            Имя
                                                        </Form.Label>
                                                    </FloatingLabel>
                                                </Col>
                                                <Col md={6}>
                                                    <FloatingLabel className="mb-3">
                                                        <Form.Control
                                                            id="email"
                                                            onChange={
                                                                handleChange
                                                            }
                                                            name="email"
                                                            value={
                                                                updateInput.email
                                                            }
                                                            type="text"
                                                            placeholder="Введите ваше email"
                                                        />
                                                        <Form.Label htmlFor="email">
                                                            E-mail
                                                        </Form.Label>
                                                    </FloatingLabel>
                                                </Col>
                                            </Row>

                                            <FloatingLabel className="mb-3">
                                                <Form.Control
                                                    as="textarea"
                                                    style={{ height: "100px" }}
                                                    id="description"
                                                    onChange={handleChange}
                                                    name="description"
                                                    value={
                                                        updateInput.description
                                                    }
                                                    type="text"
                                                    placeholder="Немного о себе"
                                                />
                                                <Form.Label htmlFor="description">
                                                    Немного о себе
                                                </Form.Label>
                                            </FloatingLabel>

                                            <Stack
                                                direction="horizontal"
                                                gap={3}
                                            >
                                                <Button
                                                    variant="outline-success"
                                                    type="submit"
                                                >
                                                    Сохранить
                                                </Button>
                                                <div className="vr" />
                                                <Button variant="outline-danger">
                                                    Reset
                                                </Button>
                                            </Stack>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Collapse>
                    </Col>
                </Row>
            </div>
        </>
    );
};
