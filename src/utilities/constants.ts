export const DeliveryStatus = {
    PENDING: "Pending",
    IN_TRANSIT: "In_Transit",
    DISPATCHED: "Dispatched",
    DELIVERED: "Delivered",
     CANCELLED: "Cancelled",
  } as const;

export const DeliveryType = {
    NEXT_DAY: "next_day",
    SAME_DAY: "same_day",
    EXPRESS: "express",
    SCHEDULED: "scheduled",
  } as const;

  export const userRoles ={
    ADMIN: "admin",
    RIDER: "rider",
    USER: "user",
  }
