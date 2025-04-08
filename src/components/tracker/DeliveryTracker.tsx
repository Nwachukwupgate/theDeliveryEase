import React, { useEffect, useState } from 'react';
import { websocketService } from '@/services/websockets';
import {  Location, LocationUpdate } from '@/types/types';
import DeliveryMap from './deliveryMap';
import { useGetDeliveryRouteQuery } from '@/api/apiSlice';

interface DeliveryTrackerProps {
  deliveryId: number;
}

export const DeliveryTracker: React.FC<DeliveryTrackerProps> = ({ deliveryId }) => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const { 
    data: route, 
    isLoading, 
    error: routeError 
  } = useGetDeliveryRouteQuery(deliveryId);

  useEffect(() => {
    // Set initial current location if route data exists
    if (route?.tracking_points?.length) {
      setCurrentLocation(route.tracking_points[route.tracking_points.length - 1]);
    }

    // Subscribe to real-time location updates
    const handleLocationUpdate = (update: LocationUpdate) => {
      setCurrentLocation({
        latitude: update.latitude,
        longitude: update.longitude,
        created_at: update.timestamp
      });
    };

    websocketService.subscribeToDelivery(deliveryId, handleLocationUpdate);

    return () => {
      websocketService.unsubscribe();
    };
  }, [deliveryId, route]);

  if (isLoading) return <div>Loading delivery route...</div>;
  if (routeError) return <div>Error loading delivery route</div>;
  if (!route) return <div>No route data available</div>;

  return (
    <div className="delivery-tracker">
      <h2>Delivery Tracking</h2>
      <div className="route-info">
        <div>
          <h3>Pickup</h3>
          <p>{route.start_point.address}</p>
        </div>
        <div>
          <h3>Delivery</h3>
          <p>{route.end_point.address}</p>
        </div>
      </div>
      
      {route && (
        <DeliveryMap 
          startPoint={route.start_point}
          endPoint={route.end_point}
          trackingPoints={route.tracking_points}
          currentLocation={currentLocation}
        />
      )}
    </div>
  );
};