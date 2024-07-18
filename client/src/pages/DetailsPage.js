import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailsPage = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/api/cars/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCar(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!car) {
    return <div>No car found</div>;
  }

  return (
    <div>
      <h1>{car.name}</h1>
      <p>Year: {car.year}</p>
      <img src={car.photo} alt={`Photo of ${car.name}`} style={{ width: '100%', height: 'auto' }} />
      <p>Description: {car.description}</p> {/* Assuming there's a description field */}
    </div>
  );
};

export default DetailsPage;
