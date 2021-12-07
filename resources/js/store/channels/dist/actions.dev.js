"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChannels = exports.channelSelect = exports.getAllChannelList = exports.deleteSelectChannel = exports.createChannel = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

var _actions = require("../messages/actions");

var _types = require("../messages/types");

var _types2 = require("./types");

var _optionsEcho = require("../../utils/optionsEcho");

var _laravelEcho = _interopRequireDefault(require("laravel-echo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var echo = new _laravelEcho["default"](_optionsEcho.options);

var createChannel = function createChannel(newChannel) {
  return {
    type: _types2.CREATE_CHANNEL,
    payload: newChannel
  };
};

exports.createChannel = createChannel;

var deleteSelectChannel = function deleteSelectChannel(id) {
  return {
    type: _types2.DELETE_CHANNEL,
    payload: id
  };
}; //


exports.deleteSelectChannel = deleteSelectChannel;

var getAllChannelList = function getAllChannelList() {
  return function (dispatch, getState) {
    var ofset = getState().channels.ofset;

    _sweetalert["default"].fire({
      title: "Загружаем данные",
      allowOutsideClick: false
    });

    _sweetalert["default"].showLoading();

    if (!ofset) {
      _sweetalert["default"].showLoading();

      _axios["default"].get("/getAllChannels", {
        withCredentials: true
      }).then(function (res) {
        var channels = res.data;
        console.log(res.data.channels);
        dispatch({
          type: _types2.GET_ALL_CHANNELS,
          payload: channels
        });
        console.log("Список каналов загружен");
        res.data.channels.map(function (item) {
          console.log(item); // dispatch(getMessagesChannel(item.id));

          console.log("Загрузка сообщений канала");
        });

        _sweetalert["default"].fire({
          icon: "success",
          title: "Добро пожаловать!",
          text: res.data.message
        });

        _sweetalert["default"].close;
      });
    }
  };
};

exports.getAllChannelList = getAllChannelList;

var channelSelect = function channelSelect(channel_id) {
  return function (dispatch, getState) {
    // const prevId = getState().channels.currChannel.id;
    // const type = getState().channels.currChannel.type;
    // echo.leave(`chat-corp.channel.${prevId}`);
    console.log(channel_id);

    _axios["default"].get("/getUsers/".concat(channel_id), {
      withCredentials: true
    }).then(function (res) {
      console.log(res.data); // const users = res.data[0].users;

      var channel = {
        id: channel_id,
        type: "channel" //     users: users,

      };
      console.log(channel); // dispatch(getMessagesChannel(channel_id));

      dispatch({
        type: _types2.SET_SELECTED_CHANNEL,
        payload: channel
      }); // dispatch({ type: ADD_CHANNEL_USERS, payload : users})

      var selectedChannelInState = getState().channels.currChannel;
      dispatch((0, _actions.getMessagesChannel)(channel_id));
      echo.join("chat-corp.channel.".concat(selectedChannelInState.id)).here(function (users) {
        console.log(users); // users.forEach(user => (user.name += "FROM.HERE()"));

        dispatch({
          type: _types2.SET_USERS_IN_ROOM,
          payload: users
        });
      }).joining(function (user) {
        console.log(user);
        dispatch({
          type: _types2.ADD_USER_TO_ROOM,
          payload: user
        });
        var message = {
          user: user,
          message: "Joined",
          status: true
        };

        if (selectedChannelInState.type === "channel") {// dispatch({ type: ADD_MESSAGE, payload: message });
        }
      }).leaving(function (user) {
        console.log(user); // dispatch({ type: USER_LEAVES_ROOM, payload: user });

        var message = {
          user: user,
          message: "Left",
          status: true
        };

        if (selectedChannelInState.type === "channel") {// dispatch({ type: ADD_MESSAGE, payload: message });
        }
      }).listen("MessageSent", function (event) {
        console.log("FROM CHANNEL EVENT FUNCTION");
        var message = {
          user: event.user,
          message: event.message.message
        };
        console.log(message); // dispatch({ type: ADD_MESSAGE, payload: message });

        var typingEvent = {
          user: event.user,
          type: "typing"
        }; // dispatch({
        //     type: REMOVE_TYPING_EVENT,
        //     payload: typingEvent,
        // });
      }).listenForWhisper("typing", function (event) {
        var timer;
        console.log("TYPING");
        console.log(event.name);
        var message = {
          user: event.name,
          type: "typing"
        }; // dispatch({ type: ADD_TYPING_EVENT, payload: message });

        clearTimeout(timer); // timer = setTimeout(() => {
        //     dispatch({
        //         type: REMOVE_TYPING_EVENT,
        //         payload: message,
        //     });
        // }, 2000);
      });
    });
  };
};

exports.channelSelect = channelSelect;

var getChannels = function getChannels() {
  return function (dispatch, getState) {
    _axios["default"].get("/api/getchannels", {
      withCredentials: true
    }).then(function (res) {
      var channels = res.data;
      dispatch({
        type: _types2.GET_CHANNELS,
        payload: channels
      });
    })["catch"](function (err) {});

    _axios["default"].get("/api/getallchannels", {
      withCredentials: true
    }).then(function (res) {
      var channels = res.data;
      dispatch({
        type: _types2.GET_ALL_CHANNELS,
        payload: channels
      });
    })["catch"](function (err) {});

    _axios["default"].get("/api/getfriendslist", {
      withCredentials: true
    }).then(function (res) {
      console.log("FRIENDS LIST BELOW");
      console.log(res.data);
    })["catch"](function (err) {});
  };
}; // export const actionChatList = id;
// export const deleteChannel =
//     (channelId, message) => async (dispatch, getState) => {
//         const msg = getState().messages.messages[channelId];
//         const messageLength = getState().messages.messages[channelId].length;
//         if (messageLength > 0) {
//             if (
//                 confirm(
//                     "В комнате есть сообщения, вы действительно хотите удалить чат?"
//                 )
//             ) {
//                 dispatch(deleteSelectChannel(channelId));
//                 for (let message of msg) {
//                     dispatch(delMessage(channelId, message));
//                 }
//             }
//         } else {
//             dispatch(delRoom(channelId));
//         }
//         console.log("DEL CHANNEL");
//     };


exports.getChannels = getChannels;