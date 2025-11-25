import { createSlice } from "@reduxjs/toolkit";
const initialState = { loading: false, notifications: [] };
const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setLoading(state, action) { state.loading = action.payload; },
        pushNotification(state, action) {
            state.notifications.push(action.payload);
        },
        popNotification(state, action) {
            state.notifications = state.notifications.filter((n) => n.id !== action.payload);
        },
    },
});
export const { setLoading, pushNotification, popNotification } = uiSlice.actions;
export default uiSlice.reducer;
