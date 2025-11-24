import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";

export type TUser = {
  userid: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  role: "admin" | "user";
  isVerified: boolean;
};

// Users API
export const usersAPI = createApi({
  reducerPath: "usersAPI",
  baseQuery: fetchBaseQuery({ baseUrl: ApiDomain }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<TUser[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    getUserById: builder.query<TUser, number>({
      query: (id) => `/users/${id}`,
    }),
    createUser: builder.mutation<{ message: string; user: TUser }, Partial<TUser>>({
      query: (newUser) => ({ url: "/users", method: "POST", body: newUser }),
      invalidatesTags: ["Users"],
    }),
    updateUserRole: builder.mutation<TUser, Partial<TUser> & { id: number }>({
      query: ({ id, ...user }) => ({ url: `/users/role/${id}`, method: "PUT", body: user }),
      invalidatesTags: ["Users"],
    }),
    verifyUser: builder.mutation<{ message: string }, { email: string; code: string }>({
      query: (data) => ({ url: "/users/verify", method: "POST", body: data }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserRoleMutation,
  useVerifyUserMutation,
} = usersAPI;

export default usersAPI;
