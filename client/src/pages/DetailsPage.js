import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DetailsPage.css'; // Import the CSS file

const DetailsPage = () => {
    const { id } = useParams();
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
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!car) {
        return <div className="no-car">No car found</div>;
    }

    return (
        <div className="details-container">
            <div className="image-container">
                <img src={car.photo} alt={`Photo of ${car.name}`} className="image" />
            </div>
            <div className="details">
                <h1 className="title">{car.name}</h1>
                <p className="year">Year: {car.year}</p>
                <p className="description">
                    Description: {car.description ? car.description : 'No description provided'}
                </p>
            </div>
        </div>
    );
};

export default DetailsPage;
