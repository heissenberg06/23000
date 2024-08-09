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
                <div className="details">
                    <h1 className="title">{car.name}</h1>
                    <p className="brand">Marka: {car.brand}</p>
                    <p className="model">Model: {car.model}</p>
                    <p className='km'>KM: {car.km}</p>
                    <p className='year'>Model: {car.year}</p>
                    <p className='power'>Beygir Gücü: {car.power}</p>
                    <p className='fuel'>Yakıt: {car.fuel}</p>
                    <p className='owner'>Araç Sahibi: {car.ownerUsername}</p>
                </div>
            </div>
            <div className="description-container">
            <h1 className="title">Açıklama</h1>
            <p className="description">
                {car.description ? car.description : 'No description provided'}
            </p>
        </div>

        </div>
    );
                };

export default DetailsPage;
