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
    <div style={{
      fontFamily: 'Poppins, sans-serif',
      backgroundColor: '#f0f2f5',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>
        Movie Trailers <span role="img" aria-label="movie camera">🎥</span>
      </h1>
      <ul style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', padding: 0, justifyContent: 'center' }}>
        {trailers.map(trailer => (
          <li key={trailer.id} style={{
            margin: '20px',
            width: '220px',
            textAlign: 'center',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            overflow: 'hidden'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
          }}
          >
            <img
              src={trailer.poster}
              alt={trailer.name}
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/200x300?text=No+Image'; }}
            />
            <div style={{ padding: '10px' }}>
              <h2 style={{ fontSize: '18px', margin: '10px 0', color: '#222' }}>{trailer.name}</h2>
              <a
                href={trailer.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: '#007bff' }}
              >
                <span role="img" aria-label="clapper board">🎬</span> Watch Trailer
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrailerList;
