
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";
import type { RootState } from "../../app/store";
import usersAPI from "./usersAPI";

export type UserPayload = {
  userid?: number;
  email: string;
  name?: string;
  role?: "admin" | "user";
};

export type LoginResp = { token: string; user: UserPayload };

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    register: builder.mutation<any, { name: string; email: string; password: string }>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
      invalidatesTags: ["Auth"],
    }),
    verifyEmail: builder.mutation<any, { email: string; code: string }>({
      query: (body) => ({ url: "/auth/verify", method: "POST", body }),
    }),
    login: builder.mutation<LoginResp, { email: string; password: string }>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      invalidatesTags: ["Auth"],
    }),
    forgotPassword: builder.mutation<any, { email: string }>({
      query: (body) => ({ url: "/auth/forgot", method: "POST", body }),
    }),
    resetPassword: builder.mutation<any, { token: string; newPassword: string }>({
      query: (body) => ({ url: "/auth/reset", method: "POST", body }),
    }),
    me: builder.query<UserPayload, void>({ query: () => "/auth/me", providesTags: ["Auth"] }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyEmailMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useMeQuery,
} = authAPI;
export default authAPI;
