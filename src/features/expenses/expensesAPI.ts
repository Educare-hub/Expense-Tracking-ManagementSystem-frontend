import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api";

// STRICT INTERFACE MATCHING MY SQL DATABASE
export interface Expense {
  id: number;
  user_id: number;
  note: string;         // SQL uses 'note' not 'description'
  amount: number;
  currency: string;
  expense_date: string; // SQL uses 'expense_date'
  category_id?: number | null;
  is_recurring?: boolean;
  receipt_url?: string;
}

export const expensesAPI = createApi({
  reducerPath: "expensesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("expensepro_token") || localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Expenses"],
  endpoints: (builder) => ({
    // QUERY RETURNING AN ARRAY
    getExpenses: builder.query<Expense[], void>({
      query: () => "/expenses",
      // If backend returns { data: [] }, unwrap it. If it returns [], keep it.
      transformResponse: (response: any) => {
        return Array.isArray(response) ? response : response.data || [];
      },
      providesTags: ["Expenses"],
    }),
    
    // 3. MUTATIONS USING 'NOTE'
    createExpense: builder.mutation<Expense, Partial<Expense>>({
      query: (body) => ({
        url: "/expenses",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Expenses"],
    }),
    
    updateExpense: builder.mutation<Expense, { id: number; body: Partial<Expense> }>({
      query: ({ id, body }) => ({
        url: `/expenses/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Expenses"],
    }),
    
    deleteExpense: builder.mutation<void, number>({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expenses"],
    }),
    
    // Fix for ReportsPage using mocked stats from list to prevent 404s)
    getExpenseStats: builder.query<any, { userId?: number; year?: number }>({
      query: () => "/expenses",
      transformResponse: (response: any) => {
        const data = Array.isArray(response) ? response : response.data || [];
        // Hapa ni kucalculate basic stats ya user to prevent crash
        const byCategory = data.reduce((acc: any, curr: any) => {
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

export const {
  useGetExpensesQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useGetExpenseStatsQuery
} = expensesAPI;