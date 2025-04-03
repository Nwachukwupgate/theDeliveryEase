import { LocalizationProvider } from "@mui/x-date-pickers";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Suspense } from "react";
import { Toaster } from "sonner";
import WelcomeLoader from "./common/loaders/WelcomeLoader";
import AppRouter from "./navigation";
import AppThemeProvider from "./theme/AppThemeProvider";

function App() {
  return (
    <>

      <AppThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Suspense fallback={<WelcomeLoader />}>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
              <AppRouter />
            </GoogleOAuthProvider>
          </Suspense>
        </LocalizationProvider>
      </AppThemeProvider>
      <Toaster richColors position="top-right" theme="light" />
    </>
  );
}

export default App;
