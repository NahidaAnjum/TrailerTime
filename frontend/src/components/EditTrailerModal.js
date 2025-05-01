import { useState } from 'react';
import axios from 'axios';
import '../styles/Modal.css';

export default function EditTrailerModal({ trailer, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    title: trailer.title,
    youtubeUrl: trailer.youtubeUrl,
    thumbnailUrl: trailer.thumbnailUrl || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5001/api/trailers/${trailer.id}`,
        formData,
        { withCredentials: true }
      );
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating trailer:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Edit Trailer</h2>
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
            placeholder="Thumbnail URL (optional)"
            value={formData.thumbnailUrl}
            onChange={(e) => setFormData({...formData, thumbnailUrl: e.target.value})}
          />
          <button type="submit">Update Trailer</button>
        </form>
      </div>
    </div>
  );
}