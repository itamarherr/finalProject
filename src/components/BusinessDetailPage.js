import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBusinessDetails } from './service/apiBusiness';

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

      throw new Error('Error fetching coordinates from OpenStreetMap API');
    }
  };

  if (!business) {
    return <div>Loading...</div>;
  }

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">{business.title}</h1>
        <p className="lead">
          {business.subtitle}
        </p>
        <div className="row">
          <div className="col-sm-4 col-md-8">
            <img
              src={business.image.url}
              alt="Books"
              className="img-fluid rounded-2"
            />
          </div>
          <div className="col-sm-8 col-md-4">
            <h1></h1>
            <p>{business.description}</p>
            <p>{business.phone}</p>
            <p>{business.email}</p>
            <div style={{ height: '400px', width: '100%' }}>
            </div>
            <div className="progress-stacked">
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessDetailPage;