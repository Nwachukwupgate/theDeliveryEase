export interface Dashboard {
    id: number;
    name: string;
    // Add any other fields relevant to the department
}[]

export interface ApiResponse<T> {
    data: T;
}

export interface RegisterApiRequest {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export interface loginApiRequest {
    email: string;
    password: string;
}

export interface verifyRequest {
    code: string;
}

export interface DeliveryReq {
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
    receipt?: File | string;
    pickup_address?: string;
    // Add any other fields and make them optional with ?
  }

export interface ApiError {
    data?: {
      message?: string;
    };
    status?: number;
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
    delivery_address: string;
    delivery_type: 'Next Day Delivery' | 'Express Delivery' | 'Same Day Delivery' | 'Scheduled Delivery';  // Assuming these are possible values
    product_name: string;
    product_description: string;
    weight: string;  // Could also parse this to number
    quantity: string;  // Could also parse this to number
    delivery_status: 'pending' | 'completed' | 'cancelled' | 'ongoing' | 'In Transit';  // Assuming these are possible values
    price: string;  // Could be number if you're parsing
    created_at: string;  // ISO 8601 date string
    updated_at: string;  // ISO 8601 date string
    rider_id: number | null;  // Nullable
    rider: {
        first_name: string,
        last_name: string,
        phone: string
    }
    stage: number;
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

export interface OrdersStats {
    totalOrders: number;
    successfulOrders: number;
    ongoingOrders: number;
    cancelledOrders: number;
}

export interface RiderDeliveries {
    deliveries: Delivery[]
    pendingDeliveries: Delivery[]
    message: string;
}
//     delivery_type: string;
//     product_name: string;
//     product_description: string;
//     weight: string;
//     quantity: string;
// }

export interface EditUser {
    first_name: string;
    last_name: string;
    email: string;
    occupation: string;
    address: string;
    file: File | null | string;
};

export interface PasswordtReq {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
}

export interface DashboardQueryParams {
    start_date?: string;
    end_date?: string;
}

export interface BikerReq {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
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
