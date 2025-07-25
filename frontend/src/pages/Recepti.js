import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { PrevArrow, NextArrow } from '../components/CustomArrows';
import { Link, useParams } from 'react-router-dom';
import '../styles/Recepti.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Recepti = () => {
  const { kategorija } = useParams();
  const [recepti, setRecepti] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    let url = 'http://localhost:5000/api/recepti';
    if (kategorija) {
      url += `?kategorija=${kategorija}`;
    }

    axios.get(url)
      .then(res => setRecepti(res.data))
      .catch(err => console.error(err));
  }, [kategorija]);

  const filtriraniRecepti = recepti.filter(r =>
    r.naziv.toLowerCase().includes(filter.toLowerCase())
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 900,
        settings: { slidesToShow: 2, slidesToScroll: 2 }
      },
      {
        breakpoint: 500,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  };

  return (
    <div className="container py-4">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pretraži recepte po nazivu..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="form-control"
        />
      </div>

      {filtriraniRecepti.length > 0 ? (
        <Slider {...settings}>
          {filtriraniRecepti.map(recept => (
            <div key={recept._id} className="recipe-card">
              {recept.slika ? (
                <img src={recept.slika} alt={recept.naziv} className="card-img" />
              ) : (
                <div className="card-img-placeholder">Nema slike</div>
              )}
              <div className="card-content">
                <h4>{recept.naziv}</h4>
                <p><strong>⏱ Vreme:</strong> {recept.vreme}</p>
                <Link to={`/recepti/${recept._id}`} className="show-more-btn">
                  Prikaži više
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center">Nema recepata za zadatu pretragu.</p>
      )}
    </div>
  );
};

export default Recepti;
