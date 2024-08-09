import React, { useEffect, useState } from 'react';
import './CarManagementPage.css'

const CarManagementPage = () => {
    const [userCars, setUserCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserCars = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/user/cars', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
                });
                if (!response.ok) throw new Error('Failed to fetch cars');

                const data = await response.json();
                setUserCars(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUserCars();
    }, []);

    const handleDeleteCar = async (carId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/cars/${carId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
            });

            if (!response.ok) throw new Error('Failed to delete car');
            setUserCars(prev => prev.filter(car => car.id !== carId));
            alert('Car deleted successfully');
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="car-management-container">
            <h1>İlanlarım</h1>
            {userCars.length > 0 ? (
                userCars.map(car => (
                    <div key={car.id}>
                        <p>{car.name} - {car.model}</p>
                        {car.photo && <img src={car.photo} alt={car.name} style={{ width: '200px', height: 'auto' }} />}
                        <button onClick={() => handleDeleteCar(car.id)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>No cars listed. Add some cars!</p>
            )}
        </div>
    );
};

export default CarManagementPage;
