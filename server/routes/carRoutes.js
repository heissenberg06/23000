const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();  // stores files in memory
const upload = multer({ storage: storage });
const carController = require('../controllers/carController');

// Route to add a new car, now with image handling
router.post('/cars', upload.single('photo'), carController.addCar);

// Routes for other car operations
router.put('/cars/:id', upload.single('photo'), carController.updateCar);  // Assuming you might also update the image
router.delete('/cars/:id', carController.deleteCar);
router.get('/cars', carController.getCars);

module.exports = router;
