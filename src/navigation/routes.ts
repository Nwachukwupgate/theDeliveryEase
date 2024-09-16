export const parentRoutes = Object.freeze({
    DASHBOARD: "/dashboard",
    MANAGER_DASHBOARD: "/manager-dashboard",
  });
  export const managerRoutes = Object.freeze({
    DASHBOARD: "/dashboard",
    MANAGE_USERS: "/manage-users",
    CREATE_FACILITY: "/create-facility",
    INSTALLATION_WALKTHROUGH: "/installation-walkthrough",
    FACILITIES: "/manager/facilities",
    FACILITY_DETAIL: "/manager/facility/:id",
    RESIDENTS: "/manager/residents",
    RESIDENTS_DETAILS: "/manager/residents/:id",
    HOME_OWNERS: "/manager/owners",
    SECURITY: "/manager/security",
    HOME_OWNER_DETAILS: "/manager/owners/:id",
    FACILITY_UNITS: "/manager/facility-unit",
    VENDORS: "/manager/vendors",
    COMMON_AREAS: "/manager/common-areas",
    ACCOUNT_INFORMATION: "/manager/financial-institution",
    MANAGE_BOOKINGS: "/manager/bookings",
    CONCIERGE_OFFICER: "/manager/concierge-officer",
    HOME_OWNERS_RESIDENTS: "/manager/owners/:id/residents",
    HOME_OWNER_CHECK_LOGS: "/manager/owners/:id/check-logs",
    HOME_OWNER_PAYMENT_HISTORY: "/manager/owners/:id/payment-history",
    RESISDENT_ACTIVITY_LOG: "/manager/residents/:id/activity-log",
    RESISDENT_INVITE_SENT: "/manager/residents/:id/invite-sent",
  });
  
  export default Object.freeze({
    // AUTH
    HOME_PAGE: "/",
    FORGOT_PASSWORD_PAGE: "/forgot-password",
    RESET_PASSWORD_PAGE: "/reset-password",
    REGISTER_PAGE: "/register",
    LOGIN: "/login",
  
    // DASHBOARD
    DASHBOARD_PAGE: parentRoutes.DASHBOARD,
    MANAGER_DASHBOARD: parentRoutes.MANAGER_DASHBOARD,
    managerRoutes,
  });
  