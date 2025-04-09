import userStore from '@/utilities/stores';
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();

const api_origin = import.meta.env.VITE_APP_API_URL

const baseQuery = fetchBaseQuery({
    baseUrl: api_origin,
    mode: "cors",
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("DELogisticsToken");
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        headers.set("Accept", "application/json");
        return headers;
    },
});

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // Wait for the mutex to be available
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        // Check if the mutex is locked (refresh already in progress)
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const refreshResult = await baseQuery(
                    {
                        url: 'refresh',
                        method: 'POST',
                    },
                    api,
                    extraOptions
                );

                if (refreshResult.data) {
                    // Store the new token
                    const data = refreshResult.data as { token: string };
                    localStorage.setItem("DELogisticsToken", data.token);
                    // Retry the original query with the new token
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    // Refresh failed - logout the user
                    userStore.logoutUser();
                }
            } finally {
                // Release the mutex
                release();
            }
        } else {
            // Wait for the mutex to be available and retry
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
};