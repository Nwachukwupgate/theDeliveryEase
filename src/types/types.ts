export interface Dashboard {
    id: number;
    name: string;
    // Add any other fields relevant to the department
  }
  
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

export interface ApiError {
    data?: {
      message?: string;
    };
    status?: number;
  }