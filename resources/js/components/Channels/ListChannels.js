import Select from "react-select";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { createChannel, deleteChannel } from "../../store/channels/actions";

const chatOptions = [
    { value: "allChats", label: "Все чаты" },
    { value: "friends", label: "Друзья" },
    { value: "groups", label: "Группы" },
    { value: "arhives", label: "Архивы" },
];
export const ListChannels = () => {
    const [selectedChat, useSelectChat] = useState("allChats");

    const [value, setValue] = useState("");
    const channels = useSelector((state) => state.channels.allChannels);

    const dispatch = useDispatch();

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
        dispatch(deleteChannel(id));
    };
    return (
        <div className="chatList">
            <div className="container">
                <div className="d-flex flex-column   bg-white">
                    <div className="title">
                        <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none ">
                            <span className="fs-5 fw-semibold">GB Chat</span>
                        </div>
                        <div className="select-group">
                            <div className="select-style  px-2">
                                <Select
                                    value={selectedChat}
                                    options={chatOptions}
                                    onChange={handleSelect}
                                />
                            </div>
                            <div className="input-group mb-3">
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
                            <div className="card " key={id}>
                                <div className="">
                                    <img
                                        src="/image/photo.png"
                                        className="img-fluid rounded-start"
                                        alt="..."
                                    />
                                </div>
                                <div className="">
                                    <div className="card-body">
                                        <Link
                                            to={`/channels/${id}`}
                                            className="text-decoration-none"
                                        >
                                            <h5 className="card-title">
                                                {title}
                                            </h5>
                                        </Link>
                                        <p className="card-text mute">
                                            часть последнего сообщения
                                        </p>
                                    </div>
                                </div>
                                <p className="card-text">
                                    <small className="text-muted">
                                        был вчера
                                    </small>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
