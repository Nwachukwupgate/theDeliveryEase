import { fetchBaseQuery, FetchBaseQueryError, BaseQueryFn, FetchArgs  } from '@reduxjs/toolkit/query/react';
import { handleApiResponse } from "@/utilities/handleApiResponse";  // Import the new handler

const api_origin = 'https://deliver.door-steps.pro/api/';

export const baseQueryWithErrorHandling = fetchBaseQuery({
  baseUrl: api_origin,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).user?.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('Accept', '*/*');
    return headers;
  },
});

export const baseQueryWithErrorHandler: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args: string | FetchArgs,
    api,
    extraOptions
  ) => {
    const result = await baseQueryWithErrorHandling(args, api, extraOptions);
  
    // Handle success and error responses globally
    handleApiResponse(result);
  
    return result;
  };
  
