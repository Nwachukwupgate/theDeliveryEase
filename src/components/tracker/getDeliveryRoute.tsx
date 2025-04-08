
// src/services/api.ts
import axios from 'axios';
import { DeliveryRoute } from '@/types/types';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL


export const getDeliveryRoute = async (deliveryId: number): Promise<DeliveryRoute> => {
  const response = await axios.get(`${API_BASE_URL}delivery/${deliveryId}/route`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('DELogisticsToken')}`
    }
  });
  return response.data;
};

export const updateDriverLocation = async (
  deliveryId: number, 
  latitude: number, 
  longitude: number,
  speed?: number
): Promise<void> => {
  await axios.post(
    `${API_BASE_URL}/deliveries/${deliveryId}/locations`,
    { latitude, longitude, speed },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  );
};