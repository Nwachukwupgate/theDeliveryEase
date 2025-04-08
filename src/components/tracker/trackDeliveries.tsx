// src/App.tsx
import React, { useState } from 'react';
import { DeliveryTracker } from './DeliveryTracker';
import DriverLocationUpdater from './driverLocationUpdater';


const TrackDelivery: React.FC = () => {
  const [deliveryId, setDeliveryId] = useState<number | null>(null);
  const [isDriver, setIsDriver] = useState<boolean>(false);

  const handleDeliveryIdSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = Number(formData.get('deliveryId'));
    if (id) {
      setDeliveryId(id);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Delivery Tracking System</h1>
      </header>
      
      <div className="user-type-toggle">
        <label>
          <input
            type="checkbox"
            checked={isDriver}
            onChange={() => setIsDriver(!isDriver)}
          />
          I am a driver
        </label>
      </div>
      
      <div className="delivery-form">
        <form onSubmit={handleDeliveryIdSubmit}>
          <label htmlFor="deliveryId">Enter Delivery ID:</label>
          <input
            type="number"
            id="deliveryId"
            name="deliveryId"
            required
          />
          <button type="submit">Track</button>
        </form>
      </div>
      
      {deliveryId && (
        <div className="delivery-content">
          {isDriver && (
            <DriverLocationUpdater deliveryId={deliveryId} />
          )}
          <DeliveryTracker deliveryId={deliveryId} />
        </div>
      )}
    </div>
  );
};

export default TrackDelivery;
