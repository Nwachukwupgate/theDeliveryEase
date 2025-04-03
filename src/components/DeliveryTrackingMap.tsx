// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
// import L from 'leaflet'
// import { useEffect, useState } from 'react'
// import Echo from 'laravel-echo'

// // Fix for default marker icons
// delete L.Icon.Default.prototype._getIconUrl
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//     iconUrl: require('leaflet/dist/images/marker-icon.png'),
//     shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// })

// // Custom rider icon
// const riderIcon = new L.Icon({
//     iconUrl: '/images/rider-icon.png', // Add your rider icon
//     iconSize: [32, 32],
//     iconAnchor: [16, 32]
// })

// type DeliveryTrackingMapProps = {
//     deliveryId: number;
//     className?: string;
// };

// export default function DeliveryTrackingMap({
//     deliveryId,
//     className = "h-[400px]"
// }: DeliveryTrackingMapProps) {
//     const [route, setRoute] = useState(null)
//     const [currentLocation, setCurrentLocation] = useState(null)
//     const [trackingHistory, setTrackingHistory] = useState([])
//     const [echo, setEcho] = useState(null)

//     // Initialize Echo only once
//     useEffect(() => {
//         const echo = new Echo({
//             broadcaster: 'reverb',
//             key: import.meta.env.VITE_WS_KEY || 'app-key', // From your .env
//             wsHost: import.meta.env.VITE_WS_HOST,
//             wsPort: import.meta.env.VITE_WS_PORT,
//             forceTLS: import.meta.env.VITE_WS_SCHEME === 'wss',
//             enabledTransports: ['ws', 'wss'],
//             auth: {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('auth_token')}`
//                 }
//             }
//         });

//         setEcho(echoInstance)

//         return () => {
//             echoInstance.disconnect()
//         }
//     }, [])

//     // Setup WebSocket listener when echo is ready
//     useEffect(() => {
//         if (!echo || !deliveryId) return

//         echo.private(`delivery.${deliveryId}`)
//             .listen('RiderLocationUpdated', (data) => {
//                 const newLocation = {
//                     lat: data.latitude,
//                     lng: data.longitude,
//                     timestamp: data.timestamp
//                 }
//                 setCurrentLocation(newLocation)
//                 setTrackingHistory(prev => [...prev, newLocation])
//             })

//         return () => {
//             echo.leave(`delivery.${deliveryId}`)
//         }
//     }, [echo, deliveryId])

//     // Fetch initial route data
//     useEffect(() => {
//         const fetchRoute = async () => {
//             try {
//                 const response = await fetch(`/api/delivery/${deliveryId}/route`, {
//                     headers: {
//                         'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
//                     }
//                 })
//                 const data = await response.json()
//                 setRoute(data)
//                 if (data.tracking_points?.length) {
//                     setTrackingHistory(data.tracking_points)
//                 }
//             } catch (error) {
//                 console.error('Error fetching route:', error)
//             }
//         }

//         if (deliveryId) fetchRoute()
//     }, [deliveryId])

//     if (!route) return <div className="p-4">Loading delivery route...</div>

//     return (
//         <div className={`relative ${className}`}>
//             <MapContainer
//                 center={[route.start_point.latitude, route.start_point.longitude]}
//                 zoom={13}
//                 style={{ height: '100%', width: '100%' }}
//             >
//                 <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />

//                 {/* Start Point Marker */}
//                 <Marker position={[route.start_point.latitude, route.start_point.longitude]}>
//                     <Popup>Pickup Location: {route.start_point.address}</Popup>
//                 </Marker>

//                 {/* End Point Marker */}
//                 <Marker position={[route.end_point.latitude, route.end_point.longitude]}>
//                     <Popup>Delivery Location: {route.end_point.address}</Popup>
//                 </Marker>

//                 {/* Rider's Current Location */}
//                 {currentLocation && (
//                     <Marker position={[currentLocation.lat, currentLocation.lng]} icon={riderIcon}>
//                         <Popup>
//                             Rider Position<br />
//                             {new Date(currentLocation.timestamp).toLocaleTimeString()}
//                         </Popup>
//                     </Marker>
//                 )}

//                 {/* Route Path */}
//                 <Polyline
//                     positions={[
//                         [route.start_point.latitude, route.start_point.longitude],
//                         ...trackingHistory.map(point => [point.latitude, point.longitude]),
//                         [route.end_point.latitude, route.end_point.longitude]
//                     ]}
//                     color="blue"
//                     weight={4}
//                 />
//             </MapContainer>

//             {/* Tracking Info Panel */}
//             <div className="absolute bottom-4 left-4 bg-white p-3 rounded shadow-md z-[1000]">
//                 <h3 className="font-bold">Delivery #{deliveryId}</h3>
//                 {currentLocation && (
//                     <p>Last update: {new Date(currentLocation.timestamp).toLocaleTimeString()}</p>
//                 )}
//             </div>
//         </div>
//     )
// }