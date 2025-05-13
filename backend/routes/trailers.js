const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { checkPermission } = require('../middleware/permit');
const {
  getAllTrailers,
  getTrailerById,
  createTrailer,
  updateTrailer,
  deleteTrailer
} = require('../controllers/trailerController');

// Public routes
router.get('/', getAllTrailers);
router.get('/:id', getTrailerById);

// Protected routes
router.post('/', auth, checkPermission('create', 'trailer'), createTrailer);
router.put('/:id', auth, checkPermission('edit', 'trailer'), updateTrailer);
router.delete('/:id', auth, checkPermission('delete', 'trailer'), deleteTrailer);

module.exports = router;