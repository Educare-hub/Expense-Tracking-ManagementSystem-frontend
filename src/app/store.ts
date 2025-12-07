// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import uiReducer from "../features/ui/uiSlice";
import authAPI from "../features/auth/authAPI";
import { expensesAPI } from "../features/expenses/expensesAPI";
import { adminAPI } from "../features/admin/adminAPI";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [expensesAPI.reducerPath]: expensesAPI.reducer,
    [adminAPI.reducerPath]: adminAPI.reducer, // Added adminAPI reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authAPI.middleware)
      .concat(expensesAPI.middleware)
      .concat(adminAPI.middleware), 
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;