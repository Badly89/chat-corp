import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Routes } from "./components/Routes";
import { store, persistor } from "./store";

export const App = () => (
    <Provider store={store}>
        <PersistGate loading={<span>loading....</span>} persistor={persistor}>
            <Routes />
        </PersistGate>
    </Provider>
);
