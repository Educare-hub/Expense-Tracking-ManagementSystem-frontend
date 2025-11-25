import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";
export const authAPI = createApi({
    reducerPath: "authAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token)
                headers.set("Authorization", `Bearer ${token}`);
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    tagTypes: ["Auth"],
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (body) => ({ url: "/auth/register", method: "POST", body }),
            invalidatesTags: ["Auth"],
        }),
        verifyEmail: builder.mutation({
            query: (body) => ({ url: "/auth/verify", method: "POST", body }),
        }),
        login: builder.mutation({
            query: (body) => ({ url: "/auth/login", method: "POST", body }),
            invalidatesTags: ["Auth"],
        }),
        forgotPassword: builder.mutation({
            query: (body) => ({ url: "/auth/forgot", method: "POST", body }),
        }),
        resetPassword: builder.mutation({
            query: (body) => ({ url: "/auth/reset", method: "POST", body }),
        }),
        me: builder.query({ query: () => "/auth/me", providesTags: ["Auth"] }),
    }),
});
export const { useRegisterMutation, useVerifyEmailMutation, useLoginMutation, useForgotPasswordMutation, useResetPasswordMutation, useMeQuery, } = authAPI;
export default authAPI;
