export interface DeliveryReq {
  contact_name: string;
  contact_phone: string;
  receiver_name: string;
  receiver_phone: string;
  pickup_address: string;
  pickup_lat?: number;
  pickup_long?: number;
  delivery_address: string;
  delivery_lat?: number;
  delivery_long?: number;
  delivery_type: string;
  product_name: string;
  product_description: string;
  price?: number;
  weight: string;
  quantity: string;
  payment_option?: string;
}

export interface Delivery {
  id: number;
  user_id: number;
  code: string;
  contact_name: string;
  contact_phone: string;
  receiver_name: string;
  receiver_phone: string;
  pickup_address: string;
  pickup_lat: number;
  pickup_long: number;
  delivery_address: string;
  delivery_lat: number;
  delivery_long: number;
  delivery_type: "same_day" | "next_day" | "scheduled" | "express";
  product_name: string;
  product_description: string;
  weight: string;
  quantity: string;
  delivery_status: string;
  price: string;
  receipt: string | null;
  created_at: string;
  updated_at: string;
  rider_id: number | null;
  stage: number;
  assignment_type: string;
  claimed_at: string | null;
  rider: null | {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
}

export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: {
    next: string | null;
    previous: string | null;
  };
}

export interface DeliveriesResponse {
  success: boolean;
  code: number;
  locale: string;
  message: string;
  data: {
    items: Delivery[];
    meta: {
      pagination: Pagination;
    };
  };
}

export interface DeliveryResponse {
  success: boolean;
  code: number;
  locale: string;
  message: string;
  data: {
    item: Delivery;
  };
}

export interface BarChartItem {
  month: number;
  year: number;
  avg_cost: number;
  delivery_count: number;
}

export interface RiderStats {
  data: {
    total_assignments: number;
    completed: number;
    active: number;
    rejected: number;
  };
}

export interface SuccessResponse {
  success: boolean;
  code: number;
  message: string;
  data: any;
}

export interface LoginResponse {
  message: string;
  success: boolean;
  code: number;
  data: {
    token: string;
    user: any;
  };
}

export interface GoogleLoginRequest {
  googleToken: string;
  email: string;
  name: string;
}


export interface Location {
  latitude: number;
  longitude: number;
  created_at?: string;
}

export interface DeliveryPoint {
  address: string;
  latitude: number;
  longitude: number;
}

export interface DeliveryRoute {
  start_point: DeliveryPoint;
  end_point: DeliveryPoint;
  tracking_points: Location[];
}

export interface LocationUpdate {
  delivery_id: number;
  latitude: number;
  longitude: number;
  timestamp: string;
}

//OLDER TYPES
export interface Dashboard {
  id: number;
  name: string;
  data?: any;
  // Add any other fields relevant to the department
}
[];

export interface ApiResponse<T> {
  data: T;
}

export interface RegisterApiRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  password_confirmation: string;
}

export interface loginApiRequest {
  email: string;
  password?: string;
}

export interface verifyRequest {
  code: string;
}

export interface ResetPasswordReq {
  email: string,
  code: string,
  password: string,
  password_confirmation: string
}
export interface DeliveryItem {
  id?: number;
  user_id?: number;
  code?: string;
  contact_name?: string;
  contact_phone?: string;
  created_at?: string;
  delivery_address?: string;
  delivery_status?: string;
  delivery_type?: string;
  price?: string;
  product_description?: string;
  product_name?: string;
  quantity?: string;
  receiver_name?: string;
  receiver_phone?: string;
  stage?: number;
  updated_at?: string;
  weight?: string;
  rider?: any;
  // receipt?: File | string;
  pickup_address?: string;
  // Add any other fields and make them optional with ?
}

export interface ApiError {
  data?: {
    message?: string;
    error?: string;
  };
  status?: number;
}

export interface DeliveryPaginationLinks {
  url: string | null;
  label: string;
  active: boolean;
}

export interface DeliveryPagination {
  current_page: number;
  data: Delivery[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: DeliveryPaginationLinks[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface DeliveryHistoryData {
  deliveries: DeliveryPagination;
}

export interface DeliveryHistoryResponse {
  success: boolean;
  code: number;
  locale: string;
  message: string;
  data: DeliveryHistoryData;
}

export interface RiderDeliveries {
  deliveries: Delivery[];
  pendingDeliveries: Delivery[];
  message: string;
}

export interface EditUser {
  first_name: string;
  last_name: string;
  email?: string;
  occupation: string;
  address: string;
  file?: File | null | string;
}

export interface PasswordtReq {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface DashboardQueryParams {
  start_date?: string;
  end_date?: string;
}

export interface DeliveryData {
  name: string;
  recieverName: string;
  phoneNumber: string;
  recieverNumber: string;
  pickupAddress: string;
  deliveryAddress: string;
  productName: string;
  productDescription: string;
  weight: string;
  quantity: string;
  type: string;
  deliveryType: string;
}

export interface dataResponse {
  message: string;
  data: any;
}
