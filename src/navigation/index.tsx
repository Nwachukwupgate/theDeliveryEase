import AppErrorBoundary from "@/common/errorComponents/AppErrorBoundary";
import WelcomeLoader from "@/common/loaders/WelcomeLoader";
import Layout from "../layout/Layout";
import { lazy } from "react";
import {
    createBrowserRouter,
    RouteObject,
    RouterProvider,
} from "react-router-dom";
import routes from "./routes";
import HomeLayout from "@/layout/HomeLayout";
import Home from "@/Home";

type ExtendedRouteObject = RouteObject & {
  protected?: boolean;
  anonymousOnly?: boolean;
};

// const Signup = lazy(() => import("@/pages/RegisterPage"));
// const Login = lazy(() => import("@/pages/LoginPage"));
// const ForgotPassword = lazy(() => import("@/pages/ForgotPasswordPage"));
// const ResetPassword = lazy(() => import("@/pages/ResetPasswordPage"));
// const ManagerDashBoard = lazy(() => import("@/pages/ManagerDashboard"));
// const ManagerManageUsers = lazy(() => import("@/pages/ManagerManageUsers"));
// const CreateFacility = lazy(() => import("@/pages/CreateFacility"));
// const InstallationWalkthrough = lazy(
//   () => import("@/pages/InstallationWalkthrough"),
// );
// const FacilityDetail = lazy(() => import("@/pages/FacilityDetails"));
// const ManagerResidents = lazy(() => import("@/pages/Residents"));
// const ManagerResidentsDetails = lazy(
//   () => import("@/pages/ManagerResidentsDetails"),
// );
// const LandOwners = lazy(() => import("@/pages/LandOwners"));
// const ManagerSecurity = lazy(() => import("@/pages/ManagerSecurity"));
// const ManagerHomeOwnerDetails = lazy(
//   () => import("@/pages/ManagerHomeOwnerDetails"),
// );
// const ManagerFacilityUnits = lazy(() => import("@/pages/ManagerFacilityUnits"));
// const ManagerVendors = lazy(() => import("@/pages/Vendors"));
// const ManagerFacility = lazy(() => import("@/pages/ManagerFacility"));
// const ManagerCommonArea = lazy(() => import("@/pages/ManagerCommonArea"));
// const ManagerAccountInformation = lazy(
//   () => import("@/pages/AccountInformation"),
// );
// const ManagerManageBookings = lazy(() => import("@/pages/ManageBookings"));
// const ManagerConciergeOfficer = lazy(() => import("@/pages/ConciergeOfficer"));
// const ManagerOwnerCheckLog = lazy(() => import("@/pages/ManagerOwnerCheckLog"));
// const ManagerOwnerResident = lazy(() => import("@/pages/ManagerOwnerResident"));
// const ManagerOwnerPayment = lazy(() => import("@/pages/ManagerOwnerPayment"));
// const ManagerResidentActivityLog = lazy(() => import("@/pages/ManageResidentActivityLog"));
// const ManagerResidentInviteSent = lazy(() => import("@/pages/ManageResidentInvite"));

const protectedRoutes: ExtendedRouteObject[] = [
  {
    path: "/",
    hasErrorBoundary: true,
    element: <Layout />,
    errorElement: <AppErrorBoundary />,
    protected: true,
    children: [
    //   {
    //     path: routes.MANAGER_DASHBOARD,
    //     element: <ManagerDashBoard />,
    //   },
    //   {
    //     path: routes.managerRoutes.MANAGE_USERS,
    //     element: <ManagerManageUsers />,
    //   },
    //   {
    //     path: routes.managerRoutes.CREATE_FACILITY,
    //     element: <CreateFacility />,
    //   },
    //   {
    //     path: routes.managerRoutes.INSTALLATION_WALKTHROUGH,
    //     element: <InstallationWalkthrough />,
    //   },
    //   {
    //     path: routes.managerRoutes.FACILITY_DETAIL,
    //     element: <FacilityDetail />,
    //   },
    //   {
    //     path: routes.managerRoutes.RESIDENTS,
    //     element: <ManagerResidents />,
    //   },
    //   {
    //     path: routes.managerRoutes.RESIDENTS_DETAILS,
    //     element: <ManagerResidentsDetails />,
    //   },
    //   {
    //     path: routes.managerRoutes.HOME_OWNERS,
    //     element: <LandOwners />,
    //   },
    //   {
    //     path: routes.managerRoutes.SECURITY,
    //     element: <ManagerSecurity />,
    //   },
    //   {
    //     path: routes.managerRoutes.HOME_OWNER_DETAILS,
    //     element: <ManagerHomeOwnerDetails />,
    //   },
    //   {
    //     path: routes.managerRoutes.FACILITY_UNITS,
    //     element: <ManagerFacilityUnits />,
    //   },
    //   {
    //     path: routes.managerRoutes.VENDORS,
    //     element: <ManagerVendors />,
    //   },
    //   {
    //     path: routes.managerRoutes.FACILITIES,
    //     element: <ManagerFacility />,
    //   },
    //   {
    //     path: routes.managerRoutes.COMMON_AREAS,
    //     element: <ManagerCommonArea />,
    //   },
    //   {
    //     path: routes.managerRoutes.ACCOUNT_INFORMATION,
    //     element: <ManagerAccountInformation />,
    //   },
    //   {
    //     path: routes.managerRoutes.MANAGE_BOOKINGS,
    //     element: <ManagerManageBookings />,
    //   },
    //   {
    //     path: routes.managerRoutes.CONCIERGE_OFFICER,
    //     element: <ManagerConciergeOfficer />,
    //   },
    //   {
    //     path: routes.managerRoutes.HOME_OWNER_CHECK_LOGS,
    //     element: <ManagerOwnerCheckLog />,
    //   },
    //   {
    //     path: routes.managerRoutes.HOME_OWNER_PAYMENT_HISTORY,
    //     element: <ManagerOwnerPayment />,
    //   },
    //   {
    //     path: routes.managerRoutes.HOME_OWNERS_RESIDENTS,
    //     element: <ManagerOwnerResident />,
    //   },
    //   {
    //     path: routes.managerRoutes.RESISDENT_ACTIVITY_LOG,
    //     element: <ManagerResidentActivityLog />,
    //   },
    //   {
    //     path: routes.managerRoutes.RESISDENT_INVITE_SENT,
    //     element: <ManagerResidentInviteSent />,
    //   },
    ],
  },
];

const unAuthenticatedOnlyRoute: ExtendedRouteObject[] = [
//   {
//     path: routes.LOGIN,
//     element: <Login />,
//     anonymousOnly: true,
//     // errorElement: <ErrorBoundary />,
//   },
//   {
//     path: routes.REGISTER_PAGE,
//     element: <Signup />,
//     anonymousOnly: true,
//     // errorElement: <ErrorBoundary />,
//   },
//   {
//     path: routes.FORGOT_PASSWORD_PAGE,
//     element: <ForgotPassword />,
//     anonymousOnly: true,
//     // errorElement: <ErrorBoundary />,
//   },
//   {
//     path: routes.RESET_PASSWORD_PAGE,
//     element: <ResetPassword />,
//     anonymousOnly: true,
//     // errorElement: <ErrorBoundary />,
//   },
//   {
//     path: routes.FORGOT_PASSWORD_PAGE,
//     element: <ForgotPassword />,
//     anonymousOnly: true,
//     // errorElement: <ErrorBoundary />,
//   },
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
