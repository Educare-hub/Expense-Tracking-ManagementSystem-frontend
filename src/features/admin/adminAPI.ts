//src/features/admin/adminAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081/api";

console.log("ADMIN API LOADED - baseUrl:", `${API_URL}/admin`);

export const adminAPI = createApi({
  reducerPath: "adminAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/admin`,  
    prepareHeaders: (headers) => {
      // Check both possible token keys - my login uses "token"
      const token = localStorage.getItem("token") || localStorage.getItem("expensepro_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        console.log("Admin API Token attached:", token.substring(0, 20) + "...");
      } else {
        console.error("No token found in localStorage!");
      }
      return headers;
    },
  }),
  tagTypes: ["AdminUsers", "AdminExpenses"],
  endpoints: (builder) => ({
    // GET QUERIES 
getAdminUsers: builder.query({
  query: () => `/users?t=${Date.now()}`,   
  transformResponse: (res: any) => {
    console.log("Raw Users Response:", res);
    return res.data ?? res ?? [];
  },
  providesTags: ["AdminUsers"],
}),

getAdminExpenses: builder.query({
  query: () => `/expenses?t=${Date.now()}`, 
  transformResponse: (res: any) => {
    console.log("Raw Expenses Response:", res);
    return res.data ?? res ?? [];
  },
  providesTags: ["AdminExpenses"],
}),

    // MUTATIONS 
    suspendUser: builder.mutation({
      query: ({ userId, suspend }) => ({
        url: "/suspend-user",
        method: "POST",
        body: { userId, suspend },
      }),
      // how my code invalidates the cache and forces refetch
      invalidatesTags: ["AdminUsers"],
    }),

    deleteExpense: builder.mutation({
      query: (expenseId) => ({
        url: `/expenses/${expenseId}`,
        method: "DELETE",
      }),
    
      invalidatesTags: ["AdminExpenses"],
    }),

    // view a specific user
    getUserDetails: builder.query({
      query: (userId) => `/users/${userId}`,
      transformResponse: (res: any) => res.data ?? res,
      providesTags: (result, error, userId) => [{ type: "AdminUsers", id: userId }],
    }),
  }),
});

export const { 
  useGetAdminUsersQuery, 
  useGetAdminExpensesQuery,
  useSuspendUserMutation,      
  useDeleteExpenseMutation,     
  useGetUserDetailsQuery,
} = adminAPI;

export default adminAPI;