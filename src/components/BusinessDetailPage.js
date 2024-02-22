import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBusinessDetails } from './service/apiBusiness'; 
import { getCard } from './service/apiCard';


function BusinessDetailPage() {
  const { id } = useParams(); 
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    fetchBusinessDetails();
  }, [id]); 

  const fetchBusinessDetails = async () => {
    try {
      const response = await getBusinessDetails(id);
      setBusiness(response);
    } catch (error) {
      console.error('Error fetching business details:', error);
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
     
    </div>
  );
}

export default BusinessDetailPage;