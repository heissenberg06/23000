import React, { useState } from 'react';
import './UploadCarPage.css';  // Import the CSS file for styling

function UploadCar() {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [photo, setPhoto] = useState(null);
    const [description, setDescription] = useState('');  // New state for description
    const [km, setKm] = useState('');
    const [model, setModel] = useState('');
    const [power, setPower] = useState('');
    const [fuel, setFuel] = useState('');
    const [brand, setBrand] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('year', year);
        formData.append('photo', photo);
        formData.append('description', description);  // Add description to formData
        formData.append('km', km);
        formData.append('model', model);
        formData.append('power', power);
        formData.append('fuel', fuel);
        formData.append('brand', brand)

        const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    
        try {
            const response = await fetch('http://localhost:3001/api/cars', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });
            if (response.ok) {
                const result = await response.json();
                alert('Car added successfully: ' + result.carId);
                setName('');  // Reset name
                setYear('');  // Reset year
                setPhoto(null);  // Reset photo
                setDescription('');  // Reset description
                setKm('');
                setModel('');
                setPower('');
                setFuel('');
                setBrand('');
            } else {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Failed to add car');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className="upload-container">
            <h1>İlan Ver</h1>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label>Başlık:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Marka:</label>
                    <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Yıl:</label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                        min="1886"  // The year the first car was invented
                        max={new Date().getFullYear()}  // Current year
                    />
                </div>
                <div className="form-group">
                    <label>Kilometre:</label>
                    <input
                        type="number"
                        value={km}
                        onChange={(e) => setKm(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Model:</label>
                    <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Beygir Gücü:</label>
                    <input
                        type="number"
                        value={power}
                        onChange={(e) => setPower(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Yakıt:</label>
                    <input
                        type="text"
                        value={fuel}
                        onChange={(e) => setFuel(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Fotoğraf:</label>
                    <input
                        type="file"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Açıklama:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows="3"
                    />
                </div>
                <button type="submit">İlan Ver</button>
            </form>
        </div>
    );
}

export default UploadCar;
