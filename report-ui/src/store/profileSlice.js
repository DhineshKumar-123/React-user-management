import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: []
    },
    reducers: {
        setProfile(state, action) { //data comes from action. state is the local store 
            state.profile = action.payload.profile   //payload: {albums : resp.data} coming from action
        }
    }
})
export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer