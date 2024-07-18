const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();  
const upload = multer({ storage: storage });
const carController = require('../controllers/carController');
const verifyToken = require('../middleware/authMiddleware'); // Adjust path as necessary

// Route to add a new car, now with authentication required
router.post('/cars', verifyToken, upload.single('photo'), carController.addCar);

// Apply verifyToken to other routes as necessary
router.put('/cars/:id', verifyToken, upload.single('photo'), carController.updateCar);
router.delete('/cars/:id', verifyToken, carController.deleteCar);
router.get('/cars', carController.getCars); // Assuming you want this public, if not, apply verifyToken here as well
router.get('/cars/:id', carController.getCarById); // No authentication applied, adjust if necessary


module.exports = router;
