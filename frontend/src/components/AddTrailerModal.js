import { useState } from 'react';
import axios from 'axios';
import '../styles/Modal.css';

export default function AddTrailerModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    youtubeUrl: '',
    thumbnailUrl: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5001/api/trailers',
        formData,
        { withCredentials: true }
      );
      onAdd();
      onClose();
    } catch (error) {
      console.error('Error adding trailer:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Add New Trailer</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
          <input
            type="url"
            placeholder="YouTube URL"
            value={formData.youtubeUrl}
            onChange={(e) => setFormData({...formData, youtubeUrl: e.target.value})}
            required
          />
          <input
            type="url"
            placeholder="Thumbnail URL"
            value={formData.thumbnailUrl}
            onChange={(e) => setFormData({...formData, thumbnailUrl: e.target.value})}
          />
          <button type="submit">Add Trailer</button>
        </form>
      </div>
    </div>
  );
}