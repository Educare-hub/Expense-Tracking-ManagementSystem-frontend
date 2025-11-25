import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api";
export const expensesAPI = createApi({
    reducerPath: "expensesAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("expensepro_token") || localStorage.getItem("token");
            if (token)
                headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["Expenses"],
    endpoints: (builder) => ({
        // QUERY RETURNING AN ARRAY
        getExpenses: builder.query({
            query: () => "/expenses",
            // If backend returns { data: [] }, unwrap it. If it returns [], keep it.
            transformResponse: (response) => {
                return Array.isArray(response) ? response : response.data || [];
            },
            providesTags: ["Expenses"],
        }),
        // 3. MUTATIONS USING 'NOTE'
        createExpense: builder.mutation({
            query: (body) => ({
                url: "/expenses",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Expenses"],
        }),
        updateExpense: builder.mutation({
            query: ({ id, body }) => ({
                url: `/expenses/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Expenses"],
        }),
        deleteExpense: builder.mutation({
            query: (id) => ({
                url: `/expenses/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Expenses"],
        }),
        // Fix for ReportsPage using mocked stats from list to prevent 404s)
        getExpenseStats: builder.query({
            query: () => "/expenses",
            transformResponse: (response) => {
                const data = Array.isArray(response) ? response : response.data || [];
                // Hapa ni kucalculate basic stats ya user to prevent crash
                const byCategory = data.reduce((acc, curr) => {
                    const cat = curr.category_id ? `Category ${curr.category_id}` : "General";
                    acc[cat] = (acc[cat] || 0) + Number(curr.amount);
                    return acc;
                }, {});
                return {
                    byCategory: Object.entries(byCategory).map(([k, v]) => ({ category: k, total: v })),
                    byMonth: []
                };
            },
            providesTags: ["Expenses"],
        })
    }),
});
export const { useGetExpensesQuery, useCreateExpenseMutation, useUpdateExpenseMutation, useDeleteExpenseMutation, useGetExpenseStatsQuery } = expensesAPI;
