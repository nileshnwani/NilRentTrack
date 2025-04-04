'use client';
import { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import { setDefaults, fromAddress } from 'react-geocode';
import Image from 'next/image';
import pin from '@/assets/images/pin.svg';
import Spinner from './Spinner';

const DEFAULT_LOCATION = {
  lat: 40.7128, // New York City latitude
  lng: -74.0060, // New York City longitude
};

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [useDefaultLocation, setUseDefaultLocation] = useState(false);

  useEffect(() => {
    // Debug environment variables
    console.log("Google API Key:", process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY);
    console.log("Mapbox Token:", process.env.NEXT_PUBLIC_MAPBOX_TOKEN);

    setDefaults({
      key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
      language: 'en',
      region: 'us',
    });

    const fetchCoords = async () => {
      try {
        if (!property.street || !property.city || !property.state || !property.zipcode) {
          console.error("Missing property location data");
          setUseDefaultLocation(true);
          setLoading(false);
          return;
        }

        const res = await fromAddress(
          `${property.street}, ${property.city}, ${property.state}, ${property.zipcode}`
        );

        if (res.results.length === 0) {
          console.error("No results found for geocoding, using default location.");
          setUseDefaultLocation(true);
          setLoading(false);
          return;
        }

        const { lat, lng } = res.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setLoading(false);
      } catch (error) {
        console.error("Geocode Error:", error);
        setUseDefaultLocation(true);
        setLoading(false);
      }
    };

    fetchCoords();
  }, [property]);

  if (loading) return <Spinner loading={loading} />;

  const mapLatitude = useDefaultLocation ? DEFAULT_LOCATION.lat : lat;
  const mapLongitude = useDefaultLocation ? DEFAULT_LOCATION.lng : lng;

  return (
    <div>
      {useDefaultLocation && (
        <div className="text-center text-red-600 font-medium mb-2">
          Location not found, displaying a sample map.
        </div>
      )}
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: mapLongitude,
          latitude: mapLatitude,
          zoom: 12,
        }}
        style={{ width: '100%', height: 500 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={mapLongitude} latitude={mapLatitude} anchor="bottom">
          <Image src={pin} alt="location" width={40} height={40} />
        </Marker>
      </Map>
    </div>
  );
};

export default PropertyMap;
