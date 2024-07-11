import React, { useEffect, useState } from 'react';

function CarsForSale() {
    const [cars, setCars] = useState([]);

    const fetchCars = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/cars');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data); // Log to see the structure and content
            setCars(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    
    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <div>
            <h1>Cars for Sale</h1>
            <div className="car-list">
                {cars.map(car => (
                    <div key={car.id} className="car">
                        <img src={car.photo} alt={car.name} style={{ width: '200px', height: '150px' }} />
                        <h2>{car.name}</h2>
                        <p>Year: {car.year}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CarsForSale;
