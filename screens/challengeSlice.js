import { createSlice } from "@reduxjs/toolkit";

const challengeSlice = createSlice({
  name: "challenge",
  initialState: {
    challengeId: null,
  },
  reducers: {
    setChallengeId: (state, action) => {
      state.challengeId = action.payload;
    },
  },
});

export const { setChallengeId } = challengeSlice.actions;
export default challengeSlice.reducer;
