import React from "react";

export const HeaderChat = () => {
    return (
        <>
            {/* <Jumbotron> */}
            <header className="title-message-field">
                <div className="container">
                    <div className="wrap-title-message">
                        <div className="card mb-3">
                            <div className="d-flex justify-content-between align-items-center ">
                                <div className="">
                                    <img
                                        src="/image/photo.png"
                                        className="img-fluid rounded-start"
                                        alt="..."
                                    />
                                </div>
                                <div className="">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            Имя пользователя
                                        </h5>
                                        <p className="card-text text-muted">
                                            статус
                                        </p>
                                        <p className="card-text">
                                            <small className="text-muted">
                                                Последнее обновление 3 мин.
                                                назад
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* </Jumbotron> */}
        </>
    );
};
