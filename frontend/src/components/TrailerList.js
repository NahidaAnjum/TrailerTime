import React, { useEffect, useState } from 'react';
import TopPicks from './TopPicks';  // Import TopPicks component

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
      padding: '20px',
      color: 'white'
    }}>
      {/* Main App Title */}
      <h1 style={{ textAlign: 'center', color: '#ffffff', fontSize: '40px', fontWeight: 'bold' }}>
        TrailerTime <span role="img" aria-label="movie camera">🎥</span>
      </h1>

      {/* TOP PICKS CAROUSEL */}
      <TopPicks trailers={trailers} />

      {/* All Movies Grid Title */}
      <h2 style={{ color: '#fff', marginTop: '40px', marginBottom: '20px', fontSize: '28px', textAlign: 'center' }}>
        All Movies
      </h2>

      {/* Movies Grid */}
      <ul style={{
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: 0,
        justifyContent: 'center'
      }}>
        {trailers.map(trailer => (
          <li key={trailer.id} style={{
            margin: '20px',
            width: '200px',
            textAlign: 'center',
            backgroundColor: '#1e1e1e',
            borderRadius: '10px',
            padding: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            overflow: 'hidden',
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
          >
            <img
              src={trailer.poster}
              alt={trailer.name}
              style={{
                width: '100%',
                height: '300px',
                borderRadius: '10px',
                objectFit: 'cover',
                marginBottom: '10px',
                transition: 'transform 0.3s ease',
              }}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/200x300?text=No+Image'; }}
            />
            <h3 style={{ fontSize: '18px', color: '#fff', fontWeight: 'bold' }}>{trailer.name}</h3>
            <a
              href={trailer.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                color: '#03a9f4',
                fontSize: '16px',
                fontWeight: 'bold',
                marginTop: '10px',
                display: 'inline-block',
              }}
            >
              🎬 Watch Trailer
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrailerList;
