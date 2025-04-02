import AppErrorBoundary from "@/common/errorComponents/AppErrorBoundary";
import WelcomeLoader from "@/common/loaders/WelcomeLoader";
import { lazy } from "react";
import {
    createBrowserRouter,
    RouteObject,
    RouterProvider,
} from "react-router-dom";
import routes from "./routes";
import HomeLayout from "@/layout/HomeLayout";
import Home from "@/Home";
import ProtectedRoute from "@/layout/ProtectedRoutes";

type ExtendedRouteObject = RouteObject & {
  protected?: boolean;
  anonymousOnly?: boolean;
};

const Signup = lazy(() => import("@/pages/SignUp"));
const Login = lazy(() => import("@/pages/Login"));
const VerifyEmail = lazy(() => import("@/pages/VerifyEmail"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const AdminDashBoard = lazy(() => import("@/pages/Admin"));
const AdminOrder = lazy(() => import("@/pages/Admin/orders"));
const AdminService = lazy(() => import("@/pages/Admin/services"));
const UserDashoard = lazy(() => import("@/pages/Users"))
const TrackingPage = lazy(() => import("@/pages/Users/tracking"))
const AddDelivery = lazy(
  () => import("@/pages/Users/deliveries"),
);
const HistoryPage = lazy(() => import("@/pages/Users/history"));
const ContactPage = lazy(() => import("@/pages/Users/contact"));
const SettingsPage = lazy(
  () => import("@/pages/Users/settings"),
);
const RiderDashBoard = lazy(() => import("@/pages/Riders"));
const DeliveryDetails = lazy(() => import("@/pages/Riders/DeliveryDetails"));
const CreateRiders = lazy(() => import("@/pages/Admin/rider"));
const RiderDeliveries = lazy(
  () => import("@/pages/Riders/deliveries"),
);
const RiderContact = lazy(() => import("@/pages/Riders/contact"));
const RiderSetting = lazy(() => import("@/pages/Riders/settings"));

const protectedRoutes: ExtendedRouteObject[] = [
  {
    path: "/",
    hasErrorBoundary: true,
    element: <ProtectedRoute />,
    errorElement: <AppErrorBoundary />,
    protected: true,
    children: [
      {
        path: routes.AdminRoute.ADMIN_DASHBOARD,
        element: <AdminDashBoard />,
      },                                                                            
      {
        path: routes.AdminRoute.ADMIN_ORDER,
        element: <AdminOrder />,
      },
      {
        path: routes.AdminRoute.ADMIN_SERVICES,
        element: <AdminService />,
      },
      {
        path: routes.AdminRoute.CREATE_RIDERS, // Dynamic route
        element: <CreateRiders />, // Rider detail component
      },
      {
        path: routes.usersRoutes.DASHBOARD,
        element: <UserDashoard />,
      },
      {
        path: routes.usersRoutes.TRACKING,
        element: <TrackingPage />,
      },
      {
        path: routes.usersRoutes.DELIVERY,
        element: <AddDelivery />
      },
      {
        path: routes.usersRoutes.HISTORY,
        element: <HistoryPage />
      },
      {
        path: routes.usersRoutes.CONTACT,
        element: <ContactPage />
      },
      {
        path: routes.usersRoutes.SETTING,
        element: <SettingsPage />
      },
      {
        path: routes.RidersRoute.RIDER_DASHBOARD,
        element: <RiderDashBoard />,
      },
      {
        path: routes.RidersRoute.RIDER_DETAIL, // Dynamic route
        element: <DeliveryDetails />,
      },
      {
        path: routes.RidersRoute.RIDER_DELIVERIES,
        element: <RiderDeliveries />
      },
      {
        path: routes.RidersRoute.AVAILABLE_DELIVERIES,
        element: <RiderDeliveries />
      },
      {
        path: routes.RidersRoute.RIDER_CONTACT,
        element: <RiderContact />
      },
      {
        path: routes.RidersRoute.RIDER_SETTINGS,
        element: <RiderSetting />
      }
    ],
  },
];

const unAuthenticatedOnlyRoute: ExtendedRouteObject[] = [
  {
    path: routes.REGISTER_PAGE,
    element: <Signup />,
    anonymousOnly: true,
    // errorElement: <ErrorBoundary />,
  },
  {
    path: routes.LOGIN,
    element: <Login />,
    anonymousOnly: true,
    // errorElement: <ErrorBoundary />,
  },
  {
    path: routes.FORGOT_PASSWORD_PAGE,
    element: <ForgotPassword />,
    anonymousOnly: true,
    // errorElement: <ErrorBoundary />,
  },
  {
    path: routes.RESET_PASSWORD_PAGE,
    element: <ResetPassword />,
    anonymousOnly: true,
    // errorElement: <ErrorBoundary />,
  },
  {
    path: routes.VERIFY_EMAIL,
    element: <VerifyEmail />,
    anonymousOnly: true,
    // errorElement: <ErrorBoundary />,
  },
];

const unProtectedRoute: ExtendedRouteObject[] = [
    {
        path: "/",
        hasErrorBoundary: true,
        element: <HomeLayout />,  
        errorElement: <AppErrorBoundary />,
        children: [
            {
            path: "/",
            element: <Home />,  
            },
        ],
    },
    // {
    //     path: "/",
    //     hasErrorBoundary: true,
    //     element: <Layout />,
    //     errorElement: <AppErrorBoundary />,
    //     children: [],
    // },
];

const allRoutes: ExtendedRouteObject[] = [
  ...unProtectedRoute,
  ...unAuthenticatedOnlyRoute,
  ...protectedRoutes,
];

const appRoutes = allRoutes.map((route) => {
  // if (route?.protected && route?.element) {
  //   route.element = <Protected component={route.element} />;
  // }
  // if (route?.anonymousOnly && route?.element) {
  //   route.element = <UnAuthenticatedOnly component={route.element} />;
  // }
  return route;
});

const router = createBrowserRouter(appRoutes);
export default function AppRouter() {
  return (
    <>
      <RouterProvider router={router} fallbackElement={<WelcomeLoader />} />
    </>
  );
}
