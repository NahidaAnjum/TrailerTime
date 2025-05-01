import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import TrailerCard from './TrailerCard';
import AddTrailerModal from './AddTrailerModal';
import AuthContext from '../contexts/AuthContext';
import '../styles/TrailerList.css';

export default function TrailerList() {
  const [trailers, setTrailers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const { user } = useContext(AuthContext);

  const fetchTrailers = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:5001/api/trailers',
        { withCredentials: true }
      );
      setTrailers(data);
    } catch (error) {
      console.error('Error fetching trailers:', error);
    }
  };

  useEffect(() => {
    fetchTrailers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5001/api/trailers/${id}`,
        { withCredentials: true }
      );
      fetchTrailers();
    } catch (error) {
      console.error('Error deleting trailer:', error);
    }
  };

  return (
    <div className="trailer-list">
      <div className="header">
        <h1>Movie Trailers</h1>
        {['admin', 'editor'].includes(user?.role) && (
          <button 
            className="add-button"
            onClick={() => setShowAddModal(true)}
          >
            + Add Trailer
          </button>
        )}
      </div>

      <div className="trailers-grid">
        {trailers.map(trailer => (
          <TrailerCard
            key={trailer.id}
            trailer={trailer}
            onDelete={handleDelete}
            canEdit={['admin', 'editor'].includes(user?.role)}
            canDelete={user?.role === 'admin'}
          />
        ))}
      </div>

      {showAddModal && (
        <AddTrailerModal
          onClose={() => setShowAddModal(false)}
          onAdd={fetchTrailers}
        />
      )}
    </div>
  );
}