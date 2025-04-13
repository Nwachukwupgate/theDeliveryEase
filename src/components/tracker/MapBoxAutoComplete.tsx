import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

interface MapboxAutocompleteProps {
  apiKey: string;
  placeholder: string;
  onPlaceSelected: (result: any) => void;
  onInputChange?: (value: string) => void;
  defaultValue?: string;
  className?: string;
  country?: string;
}

const MapboxAutocomplete: React.FC<MapboxAutocompleteProps> = ({
  apiKey,
  placeholder,
  onPlaceSelected,
  onInputChange,
  defaultValue = '',
  className = '',
  country = 'ng', // Default to Nigeria as in your original code
}) => {
  const geocoderContainerRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (!geocoderContainerRef.current) return;
    
    // Set your Mapbox access token
    mapboxgl.accessToken = apiKey;
    
    // Initialize the geocoder
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      placeholder: placeholder,
      countries: country,
      types: 'address',
      mapboxgl: (mapboxgl as unknown) as typeof import('mapbox-gl')
    });

    // Add the geocoder to the container
    geocoderContainerRef.current.appendChild(geocoder.onAdd(null as any));

    // Set up event listeners
    geocoder.on('result', (event) => {
      const { result } = event;
      if (result) {
        onPlaceSelected({
          formatted_address: result.place_name,
          geometry: {
            location: {
              lat: () => result.center[1], // Mapbox returns coordinates as [lng, lat]
              lng: () => result.center[0]
            }
          }
        });
        setValue(result.place_name);
      }
    });

    geocoder.on('clear', () => {
      onPlaceSelected(null);
      setValue('');
      if (onInputChange) {
        onInputChange('');
      }
    });

    // Set initial value if provided
    if (defaultValue) {
      geocoder.setInput(defaultValue);
    }

    // Clean up on unmount
    return () => {
      geocoder.onRemove();
    };
  }, [apiKey, placeholder, onPlaceSelected, onInputChange, defaultValue, country]);

  return (
    <div className={className}>
      <div ref={geocoderContainerRef} className="mapbox-geocoder-container" />
    </div>
  );
};

export default MapboxAutocomplete;