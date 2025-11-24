import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"; 

type Notification = { id: string; type: "success" | "error" | "info"; message: string };

type UIState = {
  loading: boolean;
  notifications: Notification[];
};

const initialState: UIState = { loading: false, notifications: [] };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) { state.loading = action.payload; },
    pushNotification(state, action: PayloadAction<Notification>) {
      state.notifications.push(action.payload);
    },
    popNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
    },
  },
});

export const { setLoading, pushNotification, popNotification } = uiSlice.actions;
export default uiSlice.reducer;
