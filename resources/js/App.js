import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Routes } from "./components/Routes";

import { store, persistor } from "./store";

// const dispatch = useDispatch();

export const App = () => {
    return (
        <Provider store={store}>
            <PersistGate
                loading={<span>loading....</span>}
                persistor={persistor}
            >
                <Routes />
            </PersistGate>
        </Provider>
    );
};
