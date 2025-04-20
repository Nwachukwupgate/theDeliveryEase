// import React, { useEffect, useState, useCallback, useRef } from 'react';
// import { useUpdateDriverLocationMutation } from '@/api/apiSlice';

// interface DriverLocationUpdaterProps {
//     deliveryId: number;
//     updateInterval?: number; // in milliseconds
// }

// const DriverLocationUpdater: React.FC<DriverLocationUpdaterProps> = ({
//     deliveryId,
//     updateInterval = 240000 // Default update every 10 seconds
// }) => {
//     const [isTracking, setIsTracking] = useState(false);
//     const [lastLocation, setLastLocation] = useState<{ lat: number, lng: number } | null>(null);
//     const [error, setError] = useState<string | null>(null);
//     const [updateDriverLocation] = useUpdateDriverLocationMutation();
//     const lastUpdateTime = useRef<number | null>(null);

//     const updateLocation = useCallback(async (position: GeolocationPosition) => {

//         const now = Date.now();
//         if (lastUpdateTime.current && now - lastUpdateTime.current < updateInterval) {
//             return; // Skip update if not enough time has passed
//         }

//         const { latitude, longitude } = position.coords;
//         const speed = position.coords.speed || undefined;

//         try {
//             await updateDriverLocation({
//                 deliveryId,
//                 latitude,
//                 longitude,
//                 speed
//             }).unwrap();

//             setLastLocation({ lat: latitude, lng: longitude });
//             setError(null);
//         } catch (err) {
//             setError('Failed to update location');
//             console.error('Location update error:', err);
//         }
//     }, [deliveryId, updateDriverLocation]);

//     const startTracking = () => {
//         if (!navigator.geolocation) {
//             setError('Geolocation is not supported by your browser');
//             return;
//         }

//         setIsTracking(true);
//     };

//     const stopTracking = () => {
//         setIsTracking(false);
//     };

//     useEffect(() => {
//         let watchId: number | null = null;

//         if (isTracking) {
//             watchId = navigator.geolocation.watchPosition(
//                 updateLocation,
//                 (err) => {
//                     setError(`Geolocation error: ${err.message}`);
//                 },
//                 {
//                     enableHighAccuracy: true,
//                     maximumAge: 0,
//                     timeout: 5000
//                 }
//             );
//         }

//         return () => {
//             if (watchId !== null) {
//                 navigator.geolocation.clearWatch(watchId);
//             }
//         };
//     }, [isTracking, updateLocation, updateInterval]);

//     return (
//         <div>
//             <h3 className="text-lg font-semibold mb-2">Location Tracking</h3>

//             {error && <div className="text-red-500 mb-2">{error}</div>}

//             <div className="tracking-controls flex gap-2">
//                 {!isTracking ? (
//                     <button
//                         onClick={startTracking}
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                     >
//                         Start Tracking
//                     </button>
//                 ) : (
//                     <button
//                         onClick={stopTracking}
//                         className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//                     >
//                         Stop Tracking
//                     </button>
//                 )}
//             </div>

//             {lastLocation && (
//                 <div className="last-location mt-4">
//                     <p className="font-semibold">Last updated location:</p>
//                     <p>Latitude: {lastLocation.lat}</p>
//                     <p>Longitude: {lastLocation.lng}</p>
//                 </div>
//             )}

//             <div className="tracking-status mt-2">
//                 Status: <span className={isTracking ? 'font-semibold text-green-500' : 'font-semibold text-gray-500'}>
//                     {isTracking ? 'Tracking active' : 'Tracking inactive'}
//                 </span>
//             </div>
//         </div>
//     );
// };

// export default DriverLocationUpdater;
