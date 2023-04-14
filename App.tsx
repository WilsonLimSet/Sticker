import { StyleSheet, Text, View } from "react-native";
import { Login } from "./src/screens/login/Login";
import { SignUp } from "./src/screens/login/SignUp";
import { Home } from "./src/screens/home/Home";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import challengeReducer from "./src/redux/challengeSlice";
import { Explore } from "./src/screens/explore/Explore";
import { Activity } from "./src/screens/activity/Activity";
import { Create } from "./src/screens/create/Create";
import { Profile } from "./src/screens/profile/Profile";
import { Routes } from "./src/navigation/Routes";
import { Providers } from "./src/navigation/Providers";

const store = configureStore({
    reducer: {
        challenge: challengeReducer,
    },
});

export default Providers;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
