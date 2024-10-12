import { appToast } from "@/utilities/appToast";
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const handleApiResponse = (response: any) => {
  if (response.error) {
    return handleApiError(response.error);
  }

  if (response.data && response.data.message) {
    return handleApiSuccess(response.data.message);
  }

  return null;
};

// Function to handle success responses
const handleApiSuccess = (message: string) => {
  appToast.Success(message); // Display success message globally
  return message;
};

// Function to handle error responses
const handleApiError = (error: FetchBaseQueryError) => {
  let errorMessage = 'Something went wrong';
  
  if (error?.data && (error.data as any)?.message) {
    errorMessage = (error.data as any).message;
  }

  appToast.Error(errorMessage); // Display error message globally
  return errorMessage;
};
