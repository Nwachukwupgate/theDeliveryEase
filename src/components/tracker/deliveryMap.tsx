import React, { useEffect, useRef } from 'react';
import { DeliveryPoint, Location } from '@/types/types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import locationMarker from "../../assets/image/location-marker.png"
import riderMarker from "../../assets/image/rider-marker.png"

interface DeliveryMapProps {
  startPoint: DeliveryPoint;
  endPoint: DeliveryPoint;
  trackingPoints: Location[];
  currentLocation: Location | null;
}

const DeliveryMap: React.FC<DeliveryMapProps> = ({
  startPoint,
  endPoint,
  trackingPoints = [],
  currentLocation
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{
    start?: L.Marker;
    end?: L.Marker;
    current?: L.Marker;
    path?: L.Polyline;
  }>({});

  useEffect(() => {
    // Initialize map if it doesn't exist
    if (!mapInstanceRef.current && mapRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(
        [startPoint.latitude, startPoint.longitude],
        13
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);

      // Add start marker
      markersRef.current.start = L.marker([startPoint.latitude, startPoint.longitude], {
        icon: L.icon({
          iconUrl: locationMarker,
          iconSize: [32, 32],
          iconAnchor: [16, 32]
        })
      })
        .addTo(mapInstanceRef.current)
        .bindPopup('Pickup Location');

      // Add end marker
      markersRef.current.end = L.marker([endPoint.latitude, endPoint.longitude], {
        icon: L.icon({
          iconUrl: locationMarker,
          iconSize: [32, 32],
          iconAnchor: [16, 32]
        })
      })
        .addTo(mapInstanceRef.current)
        .bindPopup('Delivery Location');

      // Initial path with tracking points
      const pathPoints = trackingPoints.map(point => [point.latitude, point.longitude] as [number, number]);
      markersRef.current.path = L.polyline(pathPoints, { color: 'blue' })
        .addTo(mapInstanceRef.current);

        console.log(pathPoints);
        

      // Fit map to show all points
      const bounds = L.latLngBounds([
        [startPoint.latitude, startPoint.longitude],
        [endPoint.latitude, endPoint.longitude],
        ...pathPoints
      ]);
      mapInstanceRef.current.fitBounds(bounds);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [startPoint, endPoint, trackingPoints]);

  // Update current location marker when it changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !currentLocation) return;

    // Remove old marker if it exists
    if (markersRef.current.current) {
      map.removeLayer(markersRef.current.current);
    }

    // Add new marker
    markersRef.current.current = L.marker(
      [currentLocation.latitude, currentLocation.longitude],
      {
        icon: L.icon({
          iconUrl: riderMarker,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })
      }
    )
      .addTo(map)
      .bindPopup('Current Location');

    // Update the path with current location
    if (markersRef.current.path) {
      map.removeLayer(markersRef.current.path);
    }

    const updatedPath = [
      ...trackingPoints.map(point => [point.latitude, point.longitude] as [number, number]),
      [currentLocation.latitude, currentLocation.longitude] as [number, number]
    ];

    markersRef.current.path = L.polyline(updatedPath, { color: 'blue' })
      .addTo(map);

  }, [currentLocation, trackingPoints]);

  return <div ref={mapRef} style={{ height: '500px', width: '100%' }} />;
};

export default DeliveryMap;