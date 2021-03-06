import { combineReducers, createStore, applyMiddleware } from "redux";
import { profileReducer } from "./userProfile/reducer";

import { msgReducer } from "./messages/reducer";
import { usersReducer } from "./friends/reducer";
import { compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import statusReducer from "./status/reducer";
import { authReducer } from "./auth/reducer";
import { channelReducer } from "./channels/reducer";

const persistConfig = { key: "chat-corp", storage };
const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        userProfile: profileReducer,
        channels: channelReducer,
        messages: msgReducer,
        friends: usersReducer,
        auth: authReducer,
        status: statusReducer,
    })
);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store);
