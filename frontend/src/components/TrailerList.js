import React, { useEffect, useState } from 'react';

const TrailerList = () => {
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        const response = await fetch('/api/trailers');
        const data = await response.json();
        setTrailers(data);
      } catch (error) {
        console.error('Failed to fetch trailers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailers();
  }, []);

  if (loading) {
    return <div>Loading trailers...</div>;
  }

  return (
    <div>
      <h1>
        Movie Trailers <span role="img" aria-label="movie camera">🎥</span>
      </h1>
      <ul style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', padding: 0 }}>
        {trailers.map(trailer => (
          <li key={trailer.id} style={{ margin: '20px', width: '200px', textAlign: 'center' }}>
            <img
              src={trailer.poster}
              alt={trailer.name}
              style={{ width: '100%', borderRadius: '10px', marginBottom: '10px' }}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/200x300?text=No+Image'; }}
            />
            <h2 style={{ fontSize: '18px' }}>{trailer.name}</h2>
            <a
              href={trailer.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'blue' }}
            >
              <span role="img" aria-label="clapper board">🎬</span> Watch Trailer
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrailerList;
