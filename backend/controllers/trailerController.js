// backend/controllers/trailerController.js
const Trailer = require('../models/trailer');

const getAllTrailers = async (req, res) => {
  try {
    const trailers = await Trailer.findAll();
    res.json(trailers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTrailerById = async (req, res) => {
  try {
    const trailer = await Trailer.findByPk(req.params.id);
    if (!trailer) {
      return res.status(404).json({ error: 'Trailer not found' });
    }
    res.json(trailer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTrailer = async (req, res) => {
  try {
    const { title, youtubeUrl, thumbnailUrl } = req.body;
    const trailer = await Trailer.create({ title, youtubeUrl, thumbnailUrl });
    res.status(201).json(trailer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTrailer = async (req, res) => {
  try {
    const { title, youtubeUrl, thumbnailUrl } = req.body;
    const [updated] = await Trailer.update(
      { title, youtubeUrl, thumbnailUrl },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedTrailer = await Trailer.findByPk(req.params.id);
      return res.json(updatedTrailer);
    }
    throw new Error('Trailer not found');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTrailer = async (req, res) => {
  try {
    const deleted = await Trailer.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error('Trailer not found');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllTrailers,
  getTrailerById,
  createTrailer,
  updateTrailer,
  deleteTrailer
};