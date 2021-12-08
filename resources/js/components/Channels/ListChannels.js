import Select from "react-select";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createChannel } from "../../store/channels/actions";
import { MdNotificationsNone, MdOutlineMoreVert } from "react-icons/md";
import { CreateModalChannel } from "./CreateModalChannel";
const chatOptions = [
    { value: "allChats", label: "Все чаты" },
    { value: "friends", label: "Друзья" },
    { value: "groups", label: "Группы" },
    { value: "arhives", label: "Архивы" },
];
export const ListChannels = () => {
    const [selectedChat, useSelectChat] = useState("allChats");
    const [modalShow, setModalShow] = useState(false);

    const [value, setValue] = useState("");
    const channels = useSelector((state) => state.channels.allChannels);

    const dispatch = useDispatch();

    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);

    const handleSelect = (selectedChat) => {
        useSelectChat(selectedChat);
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleClick = () => {
        dispatch(createChannel(value));
        setValue("");
    };
    const handleDelete = (id) => {
        // dispatch(deleteChannel(id));
    };
    return (
        <div className="chatList">
            <div className="d-flex flex-column   bg-white">
                <div className="title">
                    <div className="title-header">
                        <span className="fs-5 fw-semibold">GB Chat</span>
                        <div className="group-button-title">
                            <MdNotificationsNone className="svg-icon-title" />
                            <Dropdown>
                                <Dropdown.Toggle className="btn-icon-title">
                                    <MdOutlineMoreVert className="svg-icon-title" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleShow}>
                                        Новый чат
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={handleShow}>
                                        Создать группу
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <CreateModalChannel
                                show={modalShow}
                                onHide={handleClose}
                            />
                        </div>
                    </div>
                    <div className="select-group">
                        <div className="select-style  px-2">
                            <Select
                                value={selectedChat}
                                options={chatOptions}
                                onChange={handleSelect}
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                aria-label="Recipient's username"
                                aria-describedby="button-addon2"
                            />
                            <button
                                className="btn btn-search"
                                type="button"
                                id="button-addon2"
                            >
                                <i className="fas fa-search fas-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
                {/* <!-- отрисовка компонента список чатов --> */}
                <div className="group-chats">
                    {channels.channels.map(({ id, title }) => (
                        <Link
                            to={`/channels/${id}/${title}`}
                            className="text-decoration-none"
                        >
                            <Card className="card-channel" key={id}>
                                <Card.Img
                                    src="/image/photo.png"
                                    className="img-fluid rounded-start"
                                    alt="..."
                                />
                                <Card.Body className="card-body-channel">
                                    <Card.Title className="card-title-channel">
                                        {title}
                                    </Card.Title>

                                    <Card.Text className="card-text-channel mute">
                                        часть последнего сообщения
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
