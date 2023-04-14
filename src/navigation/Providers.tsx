import React from "react";
import { AuthProvider } from "./AuthProvider";
import { Routes } from "./Routes";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import store from "../redux/store";

interface ProvidersProps {}

export const Providers: React.FC<ProvidersProps> = ({}) => {
    return (
        <Provider store={store}>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </Provider>
    );
};
