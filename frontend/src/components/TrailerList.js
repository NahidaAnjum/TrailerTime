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
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Loading trailers...</div>;
  }

  return (
    <div style={{
      fontFamily: 'Poppins, sans-serif',
      backgroundColor: '#121212',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <h1 style={{ textAlign: 'center', color: '#ffffff' }}>
        Movie Trailers <span role="img" aria-label="movie camera">🎥</span>
      </h1>
      <ul style={{
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: 0,
        justifyContent: 'center'
      }}>
        {trailers.map((trailer, index) => (
          <li
            key={trailer.id}
            style={{
              margin: '20px',
              width: '200px',
              textAlign: 'center',
              backgroundColor: '#1f1f1f',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              overflow: 'hidden',
              opacity: 0,
              animation: `fadeIn 0.8s ease forwards`,
              animationDelay: `${index * 0.15}s`,
              transform: 'translateY(20px)',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,255,255,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)';
            }}
          >
            <img
              src={trailer.poster}
              alt={trailer.name}
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/200x300?text=No+Image'; }}
            />
            <div style={{ padding: '10px' }}>
              <h2 style={{ fontSize: '16px', margin: '10px 0', color: '#ffffff' }}>{trailer.name}</h2>
              <a
                href={trailer.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: '#1DB954' }}
              >
                <span role="img" aria-label="clapper board">🎬</span> Watch Trailer
              </a>
            </div>
          </li>
        ))}
      </ul>

      <style>
        {`
          @keyframes fadeIn {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default TrailerList;
