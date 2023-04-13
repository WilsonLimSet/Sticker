import { createSlice } from "@reduxjs/toolkit";

const challengeSlice = createSlice({
    name: "challenge",
    initialState: {
        challengeId: null,
        progressLog: null,
        descriptionLog: null,
        dateLog: null,
    },
    reducers: {
        setChallengeId: (state, action) => {
            state.challengeId = action.payload;
        },
        setProgress: (state, action) => {
            state.progressLog = action.payload;
        },
        setDescription: (state, action) => {
            state.descriptionLog = action.payload;
        },
        setDate: (state, action) => {
            state.dateLog = action.payload;
        },
    },
});

export const { setChallengeId } = challengeSlice.actions;
export const { setProgress } = challengeSlice.actions;
export const { setDescription } = challengeSlice.actions;
export const { setDate } = challengeSlice.actions;
export default challengeSlice.reducer;
