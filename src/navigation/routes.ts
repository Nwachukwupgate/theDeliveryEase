export const parentRoutes = Object.freeze({
  DASHBOARD: "/dashboard",
  MANAGER_DASHBOARD: "/manager-dashboard",
});

  export const usersRoutes = Object.freeze({
    DASHBOARD: "/dashboard",
    TRACKING: "/tracking",
    DELIVERY: "/delivery",
    HISTORY: "/history",
    CONTACT: "/contact",
    SETTING: "/settings"
  });

  export const AdminRoute = Object.freeze({
    ADMIN_LOGIN: "/admin/login",
    ADMIN_DASHBOARD: "/admin/dashboard",
    ADMIN_ORDER: "/admin/order",
    ADMIN_SERVICES: "/admin/services"
  })
  
  export default Object.freeze({
    // AUTH
    HOME_PAGE: "/",
    FORGOT_PASSWORD_PAGE: "/forgot-password",
    RESET_PASSWORD_PAGE: "/reset-password",
    VERIFY_EMAIL: "/verify-email",
    REGISTER_PAGE: "/register",
    LOGIN: "/login",
  
    // DASHBOARD
    DASHBOARD_PAGE: parentRoutes.DASHBOARD,
    MANAGER_DASHBOARD: parentRoutes.MANAGER_DASHBOARD,
    usersRoutes,
    AdminRoute
  });
  