import React, { useState } from "react";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";
export const CreateModalChannel = ({ show, onHide, userIdCreator }) => {
    console.log(userIdCreator);
    const [inputChannel, setInputChannel] = useState({
        title: "",
        description: "",
        image: "",
        type: "",
    });
    const handleChange = (e) => {
        setInputChannel({ ...inputChannel, [e.target.name]: e.target.value });
    };
    const handleClose = () => {
        onHide();
        setInputChannel({
            title: "",
            description: "",
            image: "",
            type: "",
        });
    };
    console.log(inputChannel);
    return (
        <div>
            <Modal
                animation
                size="lg"
                backdrop="static"
                // {...props}
                show={show}
                centered
                aria-labelledby="modalCreateChannel"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modalCreateChannel">
                        Создание нового чата
                    </Modal.Title>
                </Modal.Header>

                <Form>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="title">
                                Название канала
                            </Form.Label>
                            <Form.Control
                                id="title"
                                name="title"
                                value={inputChannel.title}
                                type="text"
                                placeholder="Введите название канала"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="description">
                                Описание
                            </Form.Label>
                            <Form.Control
                                name="description"
                                id="description"
                                value={inputChannel.description}
                                as="textarea"
                                placeholder="Описание канала"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                id="image"
                                name="image"
                                value={inputChannel.image}
                                type="file"
                                onChange={handleChange}
                            />
                            <Form.Label htmlFor="image">
                                Выберите файл
                            </Form.Label>
                        </Form.Group>
                        <InputGroup>
                            <Form.Label htmlFor="direct">
                                Приватный канал
                            </Form.Label>
                            <Form.Check
                                id="direct"
                                name="type"
                                value="direct"
                                type="radio"
                                onChange={handleChange}
                                inline
                            />
                            <Form.Label htmlFor="public">
                                Публичный канал
                            </Form.Label>
                            <Form.Check
                                name="type"
                                id="public"
                                type="radio"
                                inline
                                value="public"
                                onChange={handleChange}
                            />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type="submit">
                            Submit
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Отмена
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};
