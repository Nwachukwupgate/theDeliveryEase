import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { Toaster } from "sonner";
import WelcomeLoader from "./common/loaders/WelcomeLoader";
import AppRouter from "./navigation";
import AppThemeProvider from "./theme/AppThemeProvider";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 180_000,
//     },
//   },
// });

function App() {
  return (
    // <QueryClientProvider client={queryClient}>
      <>
      <AppThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Suspense fallback={<WelcomeLoader />}>
            <AppRouter />
          </Suspense>
        </LocalizationProvider>
      </AppThemeProvider>
      <Toaster richColors position="top-right" theme="light" />
      {/* <AppModals /> */}
      </>
    // </QueryClientProvider>
  );
}

export default App;
