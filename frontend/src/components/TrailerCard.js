import { useState } from 'react';
import axios from 'axios';
import EditTrailerModal from './EditTrailerModal';
import '../styles/TrailerCard.css';

export default function TrailerCard({ trailer, onDelete, canEdit, canDelete }) {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="trailer-card">
      <div className="trailer-thumbnail">
        <img 
          src={trailer.thumbnailUrl || 'default-thumbnail.jpg'} 
          alt={trailer.title}
        />
      </div>
      <div className="trailer-info">
        <h3>{trailer.title}</h3>
        <a
          href={trailer.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="watch-button"
        >
          Watch Trailer
        </a>
      </div>

      {(canEdit || canDelete) && (
        <div className="trailer-actions">
          {canEdit && (
            <button 
              className="edit-button"
              onClick={() => setShowEditModal(true)}
            >
              Edit
            </button>
          )}
          {canDelete && (
            <button
              className="delete-button"
              onClick={() => onDelete(trailer.id)}
            >
              Delete
            </button>
          )}
        </div>
      )}

      {showEditModal && (
        <EditTrailerModal
          trailer={trailer}
          onClose={() => setShowEditModal(false)}
          onUpdate={() => {
            setShowEditModal(false);
            window.location.reload(); // Refresh to see changes
          }}
        />
      )}
    </div>
  );
}