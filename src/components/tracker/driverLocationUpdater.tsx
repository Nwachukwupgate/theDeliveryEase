import React, { useEffect, useState, useCallback } from 'react';
import { useUpdateDriverLocationMutation } from '@/api/apiSlice';

interface DriverLocationUpdaterProps {
    deliveryId: number;
    updateInterval?: number; // in milliseconds
}

const DriverLocationUpdater: React.FC<DriverLocationUpdaterProps> = ({
    deliveryId,
    updateInterval = 10000 // Default update every 10 seconds
}) => {
    const [isTracking, setIsTracking] = useState(false);
    const [lastLocation, setLastLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [updateDriverLocation] = useUpdateDriverLocationMutation();

    const updateLocation = useCallback(async (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        const speed = position.coords.speed || undefined;

        try {
            await updateDriverLocation({
                deliveryId,
                latitude,
                longitude,
                speed
            }).unwrap();

            setLastLocation({ lat: latitude, lng: longitude });
            setError(null);
        } catch (err) {
            setError('Failed to update location');
            console.error('Location update error:', err);
        }
    }, [deliveryId, updateDriverLocation]);

    const startTracking = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        setIsTracking(true);
    };

    const stopTracking = () => {
        setIsTracking(false);
    };

    useEffect(() => {
        let watchId: number | null = null;
        let intervalId: ReturnType<typeof setInterval> | null = null;

        if (isTracking) {
            // Start interval to update location periodically based on `updateInterval`
            intervalId = setInterval(() => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(updateLocation, (err) => {
                        setError(`Geolocation error: ${err.message}`);
                    });
                }
            }, updateInterval);

            watchId = navigator.geolocation.watchPosition(
                updateLocation,
                (err) => {
                    setError(`Geolocation error: ${err.message}`);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 5000
                }
            );
        }

        return () => {
            if (watchId !== null) {
                navigator.geolocation.clearWatch(watchId);
            }
            if (intervalId !== null) {
                clearInterval(intervalId);
            }
        };
    }, [isTracking, updateLocation, updateInterval]);

    return (
        <div className="driver-location-updater">
            <h3>Location Tracking</h3>

            {error && <div className="error">{error}</div>}

            <div className="tracking-controls">
                {!isTracking ? (
                    <button onClick={startTracking}>Start Tracking</button>
                ) : (
                    <button onClick={stopTracking}>Stop Tracking</button>
                )}
            </div>

            {lastLocation && (
                <div className="last-location">
                    <p>Last updated location:</p>
                    <p>Latitude: {lastLocation.lat}</p>
                    <p>Longitude: {lastLocation.lng}</p>
                </div>
            )}

            <div className="tracking-status">
                Status: {isTracking ? 'Tracking active' : 'Tracking inactive'}
            </div>
        </div>
    );
};

export default DriverLocationUpdater;
