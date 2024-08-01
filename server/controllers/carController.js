const db = require('../database.js');

exports.addCar = (req, res) => {
    const { name, year, description, km, model, power, fuel } = req.body;
    const photo = req.file ? req.file.buffer : null;
    const caruserId = req.user.userId;  
    console.log(caruserId)

    if (!photo) {
        return res.status(400).send({ message: 'No photo provided' });
    }

    const sql = 'INSERT INTO cars (name, year, photo, description, km, model, power, fuel, caruserId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, year, photo, description, km, model, power, fuel, caruserId], (err, result) => {
        if (err) {
            console.error('Error adding car:', err);
            return res.status(500).send({ message: 'Error adding car', error: err.message });
        }
        res.status(201).send({ message: 'Car added successfully', carId: result.insertId });
    });
};

exports.updateCar = (req, res) => {
    const { id } = req.params;
    const { name, year } = req.body;
    const userId = req.user.userId;  // Assuming `req.user` contains the authenticated user's data
    const photo = req.file ? req.file.buffer : null;

    // First, check if the logged-in user is the owner of the car
    const checkOwnerSql = 'SELECT userId FROM cars WHERE id = ?';
    db.query(checkOwnerSql, [id], (err, results) => {
        if (err) {
            return res.status(500).send({ message: 'Error checking car owner', error: err });
        }
        if (results.length === 0 || results[0].userId !== userId) {
            return res.status(403).send({ message: 'Not authorized to update this car' });
        }

        // If authorized, proceed with the update
        const sql = photo ? 'UPDATE cars SET name = ?, year = ?, photo = ? WHERE id = ?' :
                            'UPDATE cars SET name = ?, year = ? WHERE id = ?';
        const params = photo ? [name, year, photo, id] : [name, year, id];
        db.query(sql, params, (err, result) => {
            if (err) {
                return res.status(500).send({ message: 'Error updating car', error: err });
            }
            res.status(200).send({ message: 'Car updated successfully' });
        });
    });
};


exports.getCars = (req, res) => {
    const sql = 'SELECT * FROM cars';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send({ message: 'Error retrieving cars', error: err });
        }
        const carsWithImages = results.map(car => ({
            ...car,
            photo: car.photo ? `data:image/jpeg;base64,${Buffer.from(car.photo).toString('base64')}` : null
        }));
        res.status(200).send(carsWithImages);
    });
};


exports.deleteCar = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM cars WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error deleting car', error: err });
        } else {
            res.status(200).send({ message: 'Car deleted successfully' });
        }
    });
};

exports.getCarById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT cars.*, users.username as ownerUsername FROM cars JOIN users ON cars.caruserId = users.id WHERE cars.id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error fetching car:', err);
            return res.status(500).send({ message: 'Error fetching car', error: err.message });
        }
        if (results.length > 0) {
            const car = {
                ...results[0],
                photo: results[0].photo ? `data:image/jpeg;base64,${Buffer.from(results[0].photo).toString('base64')}` : null,
                ownerUsername: results[0].ownerUsername  // Include the owner's username
            };
            res.status(200).send(car);
        } else {
            res.status(404).send({ message: 'Car not found' });
        }
    });
};
