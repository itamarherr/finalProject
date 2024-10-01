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
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-3 shadow-sm" style={{ height: '100%' }}>
            <img
              src={business.image.url}
              alt={business.title}
              className="card-img-top"
              style={{ height: '450px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h2 className="card-title">{business.title}</h2>
              <h5 className="card-subtitle mb-2 text-muted">{business.subtitle}</h5>
              <p className="card-text">{business.description}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Business Information</h5>
              {business.phone && <p><strong>Phone:</strong> {business.phone}</p>}
              {business.email && <p><strong>Email:</strong> {business.email}</p>}
              <p><strong>Address:</strong> 
                {business.address ? (
                  <>
                    {business.address.street && `${business.address.street} `}
                    {business.address.houseNumber && `${business.address.houseNumber}, `}
                    {business.address.city && `${business.address.city}, `}
                    {business.address.zip && `${business.address.zip}, `}
                    {business.address.state && `${business.address.state}, `}
                    {business.address.country && `${business.address.country}`}
                  </>
                ) : (
                  "Address not available"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessDetailPage;