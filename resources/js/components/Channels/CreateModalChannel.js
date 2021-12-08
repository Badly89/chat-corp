import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
export const CreateModalChannel = (props) => {
    return (
        <div>
            <Modal
                animation
                size="lg"
                backdrop="static"
                {...props}
                centered
                aria-labelledby="modalCreateChannel"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modalCreateChannel">
                        Создание нового чата
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="channelName">
                            <Form.Label>Название канала</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите название канала"
                            />
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Выберите файл</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>

                        <Form.Check
                            label="Публичный канал"
                            type="radio"
                            inline
                            name="groupChannelSelect"
                        />
                        <Form.Check
                            label="Приватный канал"
                            type="radio"
                            inline
                            name="groupChannelSelect"
                        />

                        <Button variant="success" type="submit">
                            Submit
                        </Button>
                        <Button variant="secondary" onClick={props.onHide}>
                            Отмена
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};
