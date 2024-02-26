import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBusinessDetails } from './service/apiBusiness';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


function BusinessDetailPage() {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    fetchBusinessDetails();
  }, [id]);


  const fetchBusinessDetails = async () => {
    try {
      const response = await getBusinessDetails(id);
      setBusiness(response);
      const address = response.address;
      const coordinates = await getCoordinatesFromAddress(address);
      setLatitude(coordinates.latitude);
      setLongitude(coordinates.longitude);
    } catch (error) {
      console.error('Error fetching business details:', error);
    }
  };
  const getCoordinatesFromAddress = async (address) => {
    try {

      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);


      if (!response.ok) {
        throw new Error('Failed to fetch coordinates from OpenStreetMap API');
      }

      const data = await response.json();


      if (data.length === 0) {
        throw new Error('No coordinates found for the provided address');
      }

      const latitude = parseFloat(data[0].lat);
      const longitude = parseFloat(data[0].lon);
      return { latitude, longitude };
    } catch (error) {
      // Handle errors
      console.error('Error fetching coordinates:', error);
      throw new Error('Error fetching coordinates from OpenStreetMap API');
    }
  };

  if (!business) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{business.title}</h1>
      <p>{business.description}</p>
      <p>{business.phone}</p>
      <p>{business.email}</p>
      <div style={{ height: '400px', width: '100%' }}>
        {latitude && longitude && (
          <MapContainer center={[latitude, longitude]} zoom={10} scrollWheelZoom={true}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[latitude, longitude]}>
              <Popup>{business.title}</Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </div>
  );
}

export default BusinessDetailPage;