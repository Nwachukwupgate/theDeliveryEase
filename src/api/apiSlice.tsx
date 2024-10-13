import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse, Dashboard, RegisterApiRequest, loginApiRequest, verifyRequest } from '../types/types';



const api_origin = 'https://deliver.door-steps.pro/api/';


const localToken = localStorage.getItem("token");

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: api_origin,
    mode: "cors",
    prepareHeaders: (headers) => {
      const token = localToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('Accept', '*/*');
      headers.set('Access-Control-Allow-Origin', "*");
      headers.set('Accept', 'application/json');
      headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      return headers;
    },
  }),
  tagTypes: ['Department', 'User', 'Dashboard'],

  endpoints: (builder) => ({
    registerUser: builder.mutation<void, RegisterApiRequest>({
        query: (userData) => ({
          url: 'register',
          method: 'POST',
          body: userData,
        }),
        invalidatesTags: ['User'],
    }),

    loginUser: builder.mutation<void, loginApiRequest>({
        query: (userData) => ({
          url: 'login',
          method: 'POST',
          body: userData,
        }),
        invalidatesTags: ['User'],
    }),

    verifyEmail: builder.mutation<void, verifyRequest>({
      query: (userData) => ({
        url: 'email/verify',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    getDashboard: builder.query<Dashboard, void>({
      query: () => '/dashboard',
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useVerifyEmailMutation, useGetDashboardQuery } = apiSlice;
