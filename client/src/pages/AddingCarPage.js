import React, { useState } from 'react';

function UploadCar() {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('year', year);
        formData.append('photo', photo);

        try {
            const response = await fetch('http://localhost:3001/api/cars', {
                method: 'POST',
                body: formData,  // formData will be the payload for the request
            });
            if (response.ok) {
                const result = await response.json();
                alert('Car added successfully: ' + result.carId);
                // Reset form or redirect as necessary
            } else {
                throw new Error('Failed to add car');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div>
            <h1>Upload New Car</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Year:</label>
                    <input
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Photo:</label>
                    <input
                        type="file"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        required
                    />
                </div>
                <button type="submit">Upload Car</button>
            </form>
        </div>
    );
}

export default UploadCar;
