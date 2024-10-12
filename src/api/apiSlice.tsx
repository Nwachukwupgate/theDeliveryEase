import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse, Department, RegisterApiRequest, loginApiRequest, verifyRequest } from '../types/types';


const api_origin = 'https://deliver.door-steps.pro/api/';
const urlParams = new URLSearchParams(window.location.search);
const TokenAuthless = urlParams.get('enter');

if (TokenAuthless) {
  localStorage.setItem('authless', JSON.stringify(TokenAuthless));
}

// const Token = JSON.parse(localStorage.getItem("authless") || 'null');

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: api_origin,
    mode: "cors",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).user.token;
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
  tagTypes: ['Department', 'User'],

  endpoints: (builder) => ({
    getDepartments: builder.query<Department[], void>({
      query: () => 'api/v1/ict/department/',
      transformResponse: (response: ApiResponse<Department[]>) => response.data,
      providesTags: ['Department'],
    }),

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
        url: 'login',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
  }),
  }),
});

export const { useGetDepartmentsQuery, useRegisterUserMutation, useLoginUserMutation, useVerifyEmailMutation } = apiSlice;
