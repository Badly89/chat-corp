import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Message, MessageField } from "./message";
import { selectMessages } from "../../store/messages/selectors";

import { actionDelMessage, actionMessage } from "../../store/messages/actions";
import { HeaderChat } from "./HeaderChat";
import { InputText } from "./input";

export const FieldMessages = () => {
    const { chatId } = useParams();
    const messages = useSelector(selectMessages);
    const dispatch = useDispatch();

    const sendNewMessage = useCallback(
        (newMessage) => {
            dispatch(
                actionMessage(chatId, {
                    ...newMessage,
                    id: `${chatId}-${(messages[chatId]?.length || 0) + 1}`,
                })
            );
        },
        [chatId, messages]
    );
    const delMessages = useCallback(
        (selMessage) => {
            dispatch(
                actionDelMessage(chatId, {
                    ...selMessage,
                    messages,
                    // id: `${chatId}-${messages[chatId]},
                })
            );
        },
        [chatId, messages]
    );
    return (
        <>
            {" "}
            <div className="messageList">
                <HeaderChat />

                <main className="message-field">
                    <Message
                        messages={messages[chatId]}
                        onDelMessage={delMessages}
                    />
                </main>
                <InputText onSendMessage={sendNewMessage} />
            </div>
        </>
    );
};

//  <div className="px-4 py-5 my-5 text-center">
//             <img
//                 className="d-block mx-auto mb-4"
//                 src="./image/photo.png"
//                 alt=""
//                 width="100"
//                 height="100"
//             />
//             <h1 className="display-5 fw-bold title-welcome">
//                 Добро пожаловать, Имя!
//             </h1>
//             <div className="col-lg-6 mx-auto">
//                 <p className="lead mb-4 text-welcome">
//                     Пожалуйста, выберите чат для начала переписки.
//                 </p>
//                 <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
//                     <button
//                         type="button"
//                         className="btn btn-outline-success px-4 gap-3"
//                     >
//                         Начать общение
//                     </button>
//                 </div>
//             </div>
//         </div>
// </div>}
