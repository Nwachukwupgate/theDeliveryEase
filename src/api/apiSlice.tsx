import { createApi } from "@reduxjs/toolkit/query/react";
import {
  Dashboard,
  RegisterApiRequest,
  loginApiRequest,
  verifyRequest,
  DeliveryItem,
  EditUser,
  PasswordtReq,
  DashboardQueryParams,
  DeliveryHistoryResponse,
  dataResponse,
  DeliveriesResponse,
  RiderStats,
  SuccessResponse,
  DeliveryResponse,
  GoogleLoginRequest,
  LoginResponse,
  DeliveryRoute,
  ResetPasswordReq,
} from "../types/types";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
// import { baseUrl } from "@/config";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
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

    googleLogin: builder.mutation<LoginResponse, GoogleLoginRequest>({
      query: (googleData) => ({
        url: 'auth/google-login',
        method: 'POST',
        body: googleData,
      }),
    }),

    verifyEmail: builder.mutation<void, verifyRequest>({
      query: (userData) => ({
        url: "auth/verify-email",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    resendVerification: builder.query<{ message: string }, void>({ 
      query: () => ({
        url: 'auth/resend-verification',
        method: 'GET',
      }),
    }),

    resetPassword: builder.mutation<dataResponse, ResetPasswordReq>({
      query: (userData) => ({
        url: "auth/reset-password",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    forgotPassword: builder.mutation<dataResponse, loginApiRequest>({
      query: (userData) => ({
        url: "auth/forgot-password",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    getDashboard: builder.query<Dashboard, void>({
      query: () => "dashboard",
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
      query: () => "delivery-stats",
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
      invalidatesTags: ["Delivery", "Dashboard"],
    }),

    getHistory: builder.query<Record<string, any>, { page: number }>({
      query: ({ page }) => ({
        url: "delivery-history",
        params: { page },
      }),
      providesTags: ["Delivery"],
    }),

    getDelivery: builder.query<DeliveryResponse, number>({
      query: (id) => ({
        url: `deliveries/${id}`,
      }),
      providesTags: ["Delivery"],
    }),

    getDeliveries: builder.query<
      DeliveriesResponse,
      { type?: string; page?: number, status?: string }
    >({
      query: ({ type, page, status }) => {
        const params = new URLSearchParams();
        if (type) params.append("type", type);
        if (status) params.append("status", status);
        if (page) params.append("page", page.toString());

        return {
          url: "deliveries",
          params: Object.fromEntries(params),
        };
      },
      providesTags: ["Deliveries"],
    }),

    editUser: builder.mutation<SuccessResponse, EditUser>({
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

    createRider: builder.mutation<SuccessResponse, RegisterApiRequest>({
      query: (userData) => ({
        url: "admin/create-rider",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    getAvailableRiders: builder.query({
      query: ({ page = 1, per_page = 20 }) => ({
        url: `admin/riders`,
        params: { available: true, page, per_page },
        method: "GET",
      }),
      providesTags: ["Delivery"],
    }),

    assignRider: builder.mutation<
      dataResponse,
      { delivery_id: string; rider_id: number }
    >({
      query: ({ delivery_id, rider_id }) => ({
        url: `admin/delivery/${delivery_id}/assign`,
        method: "POST",
        body: { rider_id },
      }),
      invalidatesTags: ["Deliveries", "Dashboard", "Delivery"],
    }),

    riderDashboardStats: builder.query<RiderStats, void>({
      query: () => ({
        url: `rider/stats`,
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    riderAssignedDeliveries: builder.query<DeliveriesResponse, { page: number }>({
      query: ({ page }) => ({
        url: `rider/deliveries`,
        params: { page },
        method: "GET",
      }),
      providesTags: ["Delivery"],
    }),

    ridersAccept: builder.mutation<SuccessResponse, string>({
      query: (deliveryId) => ({
        url: `deliveries/${deliveryId}/claim`,
        method: 'POST',
      }),
      invalidatesTags: ['Delivery', 'Dashboard']
    }),

    ridersReject: builder.mutation<SuccessResponse, string>({
      query: (deliveryId) => ({
        url: `rider/delivery/${deliveryId}/reject`,
        method: 'POST',
      }),
      invalidatesTags: ['Delivery', 'Dashboard']
    }),

    updateDeliveryStatus: builder.mutation<SuccessResponse, { id: number; status: string }>({
      query: ({ id, status }) => ({
        url: `deliveries/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Delivery", "Dashboard"],
    }),

    getDeliveryRoute: builder.query<DeliveryRoute, number>({
      query: (deliveryId) => ({
        url: `delivery/${deliveryId}/route`,
        method: "GET"
      }),
      providesTags: ["Delivery"]
    }),

    updateDriverLocation: builder.mutation<
      void,
      {
        deliveryId: number;
        latitude: number;
        longitude: number;
        speed?: number
      }
    >({
      query: ({ deliveryId, latitude, longitude, speed }) => ({
        url: `delivery/${deliveryId}/locations`,
        method: "POST",
        body: { latitude, longitude, speed }
      }),
      invalidatesTags: ["Delivery"]
    }),


  }),
});

export const {
  useRegisterUserMutation,
  useGetDeliveryHistoryQuery,
  useLoginUserMutation,
  useVerifyEmailMutation,
  useResendVerificationQuery,
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
  useGetAvailableRidersQuery,
  useAssignRiderMutation,
  useGetDeliveryQuery,
  useGetDeliveriesQuery,
  useRidersAcceptMutation,
  useRidersRejectMutation,
  useUpdateDeliveryStatusMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRiderAssignedDeliveriesQuery,
  useRiderDashboardStatsQuery,
  useGoogleLoginMutation,
  useGetDeliveryRouteQuery,
  useUpdateDriverLocationMutation
} = apiSlice;
