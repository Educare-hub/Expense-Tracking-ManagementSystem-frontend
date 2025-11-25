// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import uiReducer from "../features/ui/uiSlice";
import authAPI from "../features/auth/authAPI";
import { expensesAPI } from "../features/expenses/expensesAPI";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        [authAPI.reducerPath]: authAPI.reducer,
        [expensesAPI.reducerPath]: expensesAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
        .concat(authAPI.middleware)
        .concat(expensesAPI.middleware),
});
