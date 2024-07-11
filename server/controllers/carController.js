const db = require('../database.js');

exports.addCar = (req, res) => {
    const { name, year } = req.body;
    const photo = req.file.buffer;  // Access the image file buffer
    const sql = 'INSERT INTO cars (name, year, photo) VALUES (?, ?, ?)';
    db.query(sql, [name, year, photo], (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Error adding car', error: err });
        }
        res.status(201).send({ message: 'Car added successfully', carId: result.insertId });
    });
};

exports.updateCar = (req, res) => {
    const { id } = req.params;
    const { name, year } = req.body;
    const photo = req.file ? req.file.buffer : null;
    const sql = photo ? 'UPDATE cars SET name = ?, year = ?, photo = ? WHERE id = ?' :
                        'UPDATE cars SET name = ?, year = ? WHERE id = ?';
    const params = photo ? [name, year, photo, id] : [name, year, id];
    db.query(sql, params, (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Error updating car', error: err });
        }
        res.status(200).send({ message: 'Car updated successfully' });
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
