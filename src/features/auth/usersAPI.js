import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";
// Users API
export const usersAPI = createApi({
    reducerPath: "usersAPI",
    baseQuery: fetchBaseQuery({ baseUrl: ApiDomain }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/users",
            providesTags: ["Users"],
        }),
        getUserById: builder.query({
            query: (id) => `/users/${id}`,
        }),
        createUser: builder.mutation({
            query: (newUser) => ({ url: "/users", method: "POST", body: newUser }),
            invalidatesTags: ["Users"],
        }),
        updateUserRole: builder.mutation({
            query: ({ id, ...user }) => ({ url: `/users/role/${id}`, method: "PUT", body: user }),
            invalidatesTags: ["Users"],
        }),
        verifyUser: builder.mutation({
            query: (data) => ({ url: "/users/verify", method: "POST", body: data }),
            invalidatesTags: ["Users"],
        }),
    }),
});
export const { useGetUsersQuery, useGetUserByIdQuery, useCreateUserMutation, useUpdateUserRoleMutation, useVerifyUserMutation, } = usersAPI;
export default usersAPI;
