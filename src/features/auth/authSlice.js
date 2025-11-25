import { createSlice } from "@reduxjs/toolkit";
const initialState = { token: null, user: null, loading: false };
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthStart(state) { state.loading = true; },
        setAuthSuccess(state, action) {
            state.loading = false;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        setAuthFailed(state) { state.loading = false; },
        logout(state) { state.token = null; state.user = null; state.loading = false; },
    },
});
export const { setAuthStart, setAuthSuccess, setAuthFailed, logout } = authSlice.actions;
export default authSlice.reducer;
