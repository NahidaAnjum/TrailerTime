import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TopPicks = () => {
  const [topPicks, setTopPicks] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchTopPicks = async () => {
      try {
        const response = await fetch('/api/trailers');
        const data = await response.json();
        const shuffled = data.sort(() => 0.5 - Math.random());
        setTopPicks(shuffled.slice(0, 5)); // pick 5 random movies
      } catch (error) {
        console.error('Failed to fetch top picks:', error);
      }
    };

    fetchTopPicks();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: '0px',
    pauseOnHover: true,
  };

  const handlePosterClick = (url) => {
    window.open(url, '_blank'); // open trailer link in a new tab
  };

  return (
    <div style={{
      width: '100%',
      padding: '20px 0',
      backgroundColor: '#121212',
    }}>
      <Slider {...settings} ref={sliderRef}>
        {topPicks.map((movie) => (
          <div key={movie.id} style={{ padding: '0 10px', cursor: 'pointer' }}>
            <img
              src={movie.poster}
              alt={movie.name}
              onClick={() => handlePosterClick(movie.url)}
              style={{
                width: '100%',
                height: '500px',
                objectFit: 'fill',
                borderRadius: '20px',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450?text=No+Image'; }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TopPicks;
