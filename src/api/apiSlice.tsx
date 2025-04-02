import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Dashboard,
  RegisterApiRequest,
  loginApiRequest,
  verifyRequest,
  DeliveryItem,
  EditUser,
  PasswordtReq,
  DashboardQueryParams,
  BikerReq,
  DeliveryHistoryResponse,
  Delivery,
  dataResponse,
  resetPassword,
  DeliveriesResponse,
  RiderStats,
  SuccessResponse,
} from "../types/types";
import { baseUrl } from "@/config";

const api_origin = baseUrl;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: api_origin,
    mode: "cors",
    prepareHeaders: (headers) => {
      // Dynamically fetch the token from localStorage
      const token = localStorage.getItem("DELogisticsToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("Accept", "*/*");
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Accept", "application/json");
      headers.set(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept",
      );
      return headers;
    },
  }),
  tagTypes: ["Department", "User", "Dashboard", "Deliveries", "Delivery"],

  endpoints: (builder) => ({
    registerUser: builder.mutation<dataResponse, RegisterApiRequest>({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    loginUser: builder.mutation<dataResponse, loginApiRequest>({
      query: (userData) => ({
        url: "auth/login",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    verifyEmail: builder.mutation<void, verifyRequest>({
      query: (userData) => ({
        url: "email/verify",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    resetPassword: builder.mutation<dataResponse, resetPassword>({
      query: (userData) => ({
        url: "password/reset",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    forgotPassword: builder.mutation<dataResponse, loginApiRequest>({
      query: (userData) => ({
        url: "password/email",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    getDashboard: builder.query<Dashboard, void>({
      query: () => "/dashboard",
      providesTags: ["Dashboard"],
    }),

    // New Delivery History Query
    getDeliveryHistory: builder.query<
      DeliveryHistoryResponse,
      { start_date?: string; end_date?: string; page?: number }
    >({
      query: ({ start_date, end_date, page }) => ({
        url: "delivery-history",
        params: { start_date, end_date, page },
      }),
      providesTags: ["Deliveries"],
    }),

    getDeliveryStat: builder.query<Dashboard, void>({
      query: () => "/delivery-stats",
      providesTags: ["Dashboard"],
    }),

    getDeliveryHistoryStats: builder.query<Record<string, any>, DashboardQueryParams>(
      {
        query: ({ start_date, end_date }) => {
          const params = new URLSearchParams();
          if (start_date) params.append("start_date", start_date);
          if (end_date) params.append("end_date", end_date);

          return `delivery-history/stats/charts?${params.toString()}`;
        },
        providesTags: ["Dashboard"],
      },
    ),

    getAdminDashboardStats: builder.query<
      Record<string, any>,
      DashboardQueryParams
    >({
      query: ({ start_date, end_date }) => {
        const params = new URLSearchParams();
        if (start_date) params.append("start_date", start_date);
        if (end_date) params.append("end_date", end_date);

        return `admin/dashboard?${params.toString()}`;
      },
      providesTags: ["Dashboard"],
    }),

    createDelivery: builder.mutation<dataResponse, DeliveryItem>({
      query: (userData) => ({
        url: "deliveries",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Delivery"],
    }),

    getHistory: builder.query<Record<string, any>, { page: number }>({
      query: ({ page }) => ({
        url: "delivery-history",
        params: { page },
      }),
      providesTags: ["Delivery"],
    }),

    getDelivery: builder.query<Delivery, number>({
      query: (id) => ({
        url: `delivery/${id}`,
      }),
      providesTags: ["Delivery"],
    }),

    getDeliveries: builder.query<
      DeliveriesResponse,
      { type?: string; page?: number }
    >({
      query: ({ type, page }) => {
        const params = new URLSearchParams();
        if (type) params.append("type", type);
        if (page) params.append("page", page.toString());

        return {
          url: "deliveries",
          params: Object.fromEntries(params),
        };
      },
      providesTags: ["Deliveries"],
    }),

    editUser: builder.mutation<dataResponse, EditUser>({
      query: (userData) => ({
        url: "settings/profile",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    changePassword: builder.mutation<dataResponse, PasswordtReq>({
      query: (userData) => ({
        url: "settings/change-password",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    getNotification: builder.query<Record<string, any>, void>({
      query: () => "notifications",
      providesTags: ["User"],
    }),

    getUser: builder.query<Record<string, any>, void>({
      query: () => "user",
      providesTags: ["User"],
    }),

    createRider: builder.mutation<dataResponse, BikerReq>({
      query: (userData) => ({
        url: "admin/create-rider",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    getBikers: builder.query<Record<string, any>, void>({
      query: () => "/admin/riders",
      providesTags: ["Delivery"],
    }),

    assignRider: builder.mutation<
      dataResponse,
      { delivery_id: string; rider_id: number }
    >({
      query: ({ delivery_id, rider_id }) => ({
        url: `admin/deliveries/${delivery_id}/assign`,
        method: "POST",
        body: { rider_id },
      }),
      invalidatesTags: ["Delivery"],
    }),

    riderDashboardStats: builder.query<RiderStats, void>({
      query: () => ({
        url: `rider/stats`,
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    riderAvailableDeliveries: builder.query<DeliveriesResponse, { page: number }>({
      query: ({page}) => ({
        url: `deliveries/available`,
        params: { page },
        method: "GET",
      }),
      providesTags: ["Delivery"],
    }),

    riderActiveDeliveries: builder.query<DeliveriesResponse, { page: number }>({
      query: ({ page }) => ({
        url: `/rider/deliveries`,
        params: { page },
        method: "GET",
      }),
      providesTags: ["Delivery"],
    }),

    ridersAccept: builder.mutation<SuccessResponse, string>({
      query: (deliveryId) => ({
        url: `/deliveries/${deliveryId}/claim`,
        method: 'POST',
      }),
      invalidatesTags: ['Delivery']
    }),
  
    ridersReject: builder.mutation<SuccessResponse, string>({
      query: (deliveryId) => ({
        url: `/rider/delivery/${deliveryId}/reject`,
        method: 'POST',
      }),
      invalidatesTags: ['Delivery']
    }),

    updateDeliveryStatus: builder.mutation<
      { message: string },
      { id: number; status: string; location: string }
    >({
      query: ({ id, status, location }) => ({
        url: `delivery/${id}/status`,
        method: "PATCH",
        body: { status, location },
      }),
      invalidatesTags: ["Delivery"], // Adjust tags as needed
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useGetDeliveryHistoryQuery,
  useLoginUserMutation,
  useVerifyEmailMutation,
  useGetDashboardQuery,
  useCreateDeliveryMutation,
  useGetHistoryQuery,
  useEditUserMutation,
  useChangePasswordMutation,
  useGetNotificationQuery,
  useGetUserQuery,
  useGetDeliveryStatQuery,
  useGetDeliveryHistoryStatsQuery,
  useGetAdminDashboardStatsQuery,
  useCreateRiderMutation,
  useGetBikersQuery,
  useAssignRiderMutation,
  useGetDeliveryQuery,
  useGetDeliveriesQuery,
  useRidersAcceptMutation,
  useRidersRejectMutation,
  useUpdateDeliveryStatusMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRiderAvailableDeliveriesQuery,
  useRiderActiveDeliveriesQuery,
  useRiderDashboardStatsQuery,
} = apiSlice;
