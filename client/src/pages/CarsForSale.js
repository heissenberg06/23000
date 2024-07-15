import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './CarsForSale.css';

function CarsForSale() {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // Initialize navigate function

    const fetchCars = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/cars');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCars(data);
            setFilteredCars(data); // Initially no filter is applied
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    
    useEffect(() => {
        fetchCars();
    }, []);

    // Handle filtering
    useEffect(() => {
        const results = cars.filter(car =>
            car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.year.toString().includes(searchTerm)
        );
        setFilteredCars(results);
    }, [searchTerm, cars]);

    // Navigate to car detail page
    const handleCardClick = (id) => {
        navigate(`/car/${id}`); // Assuming you have a route set up for this
    };

    return (
        <div className="container">
            <h1>Cars for Sale</h1>
            <input 
                type="text" 
                placeholder="Search by name or year..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                style={{ margin: '10px 0', padding: '10px', width: '100%' }}
            />
            <div className="car-list">
                {filteredCars.map(car => (
                    <div key={car.id} className="car" onClick={() => handleCardClick(car.id)} style={{ cursor: 'pointer' }}>
                        <img src={car.photo} alt={car.name} />
                        <div className="car-info">
                            <h2>{car.name}</h2>
                            <p>Year: {car.year}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CarsForSale;
