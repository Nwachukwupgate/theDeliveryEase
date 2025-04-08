export const parentRoutes = Object.freeze({
  DASHBOARD: "/dashboard",
});

  export const usersRoutes = Object.freeze({
    DASHBOARD: "/dashboard",
    TRACKING: "/tracking/:trackingId",
    DELIVERY: "/delivery",
    HISTORY: "/history",
    CONTACT: "/contact",
    SETTING: "/settings"
  });

  export const AdminRoute = Object.freeze({
    ADMIN_DASHBOARD: "/admin/dashboard",
    ADMIN_ORDER: "/admin/order",
    ADMIN_SERVICES: "/admin/services",
    CREATE_RIDERS: "/admin/create-riders"
  })

  export const RidersRoute = Object.freeze({
    RIDER_DASHBOARD: "/rider/dashboard",
    RIDER_DETAIL: "/rider/:id",
    RIDER_DELIVERIES: "/rider/deliveries",
    AVAILABLE_DELIVERIES: '/rider/available-deliveries',
    RIDER_CONTACT: "/rider/contact",
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
    usersRoutes,
    AdminRoute,
    RidersRoute
  });
  