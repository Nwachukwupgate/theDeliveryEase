import { LocalizationProvider } from "@mui/x-date-pickers";
import { GoogleOAuthProvider } from '@react-oauth/google';
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

const clientId = "518977024520-r6cs1luj21h502m8c8ku52ka3radf80m.apps.googleusercontent.com"

function App() {

  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       clientId: clientId,
  //       scope: ""
  //     })
  //   }
  //   gapi.load('client:auth2', start)
  // })


  return (
    // <QueryClientProvider client={queryClient}>
      <>
      
        <AppThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Suspense fallback={<WelcomeLoader />}>
              <GoogleOAuthProvider clientId={clientId}>      
                <AppRouter />
              </GoogleOAuthProvider>
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
