import { configureStore } from "@reduxjs/toolkit";
import challengeReducer from "./challengeSlice";

const store = configureStore({
    reducer: {
        challenge: challengeReducer,
    },
});

export default store;
