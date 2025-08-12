import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { PrevArrow, NextArrow } from '../components/CustomArrows';
import { Link, useParams } from 'react-router-dom';
import '../styles/Recepti.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { SavedContext } from '../components/SavedContext';

const Recepti = () => {
  const { kategorija } = useParams();
  const [recepti, setRecepti] = useState([]);
  const [najnoviji, setNajnoviji] = useState([]);
  const { saved, toggleSave } = useContext(SavedContext);



  // Paginacija za grid
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;


  useEffect(() => {
    let url = 'http://localhost:5000/api/recepti';
    if (kategorija) {
      url += `?kategorija=${kategorija}`;
    }

    axios.get(url)
      .then(res => setRecepti(res.data))
      .catch(err => console.error(err));
  }, [kategorija]);

  // Filtriramo samo one sa createdAt u poslednjih 10 dana za slider
  const danas = new Date();
  const desetDanaUnazad = new Date();
  desetDanaUnazad.setDate(danas.getDate() - 10);

  const najnovijiRecepti = recepti.filter(r => {
    const datum = new Date(r.createdAt);
    return datum >= desetDanaUnazad && datum <= danas;
  });

  
  // Paginarani recepti za grid
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecepti = recepti.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(recepti.length / itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 2, slidesToScroll: 2 }},
      { breakpoint: 500, settings: { slidesToShow: 1, slidesToScroll: 1 }}
    ]
  };

  return (
    <div className="containerRecipe">

{/* Grid sa svim receptima */}
      <h2>Svi recepti</h2>
      <div className="recipe-grid">
        {currentRecepti.length > 0 ? (
          currentRecepti.map(recept => (
            <div key={recept._id} className="recipe-card">
              {recept.slika ? (
                <img src={recept.slika} alt={recept.naziv} className="card-img" />
              ) : (
                <div className="card-img-placeholder">Nema slike</div>
              )}
              <div className="card-content">
                <h4>{recept.naziv}</h4>
                <button onClick={() => toggleSave(recept._id)} className="save-heart-btn">
                  {saved.includes(recept._id) ? <FaHeart /> : <FaRegHeart />}
                </button>
                <p><strong>⏱ Vreme:</strong> {recept.vreme}</p>
                <Link to={`/recepti/${recept._id}`} className="show-more-btn">Prikaži više</Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Nema dostupnih recepata.</p>
        )}
      </div>

      {/* Paginacija */}
      <div className="pagination">
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          Prethodna
        </button>
        <span>Strana {currentPage} od {totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Sledeća
        </button>
      </div>

      {/* Slider najnovijih recepata */}
      <div style={{ marginTop: 40 }}>
        <h2>Najnoviji recepti</h2>
        {najnovijiRecepti.length > 0 ? (
          <Slider {...settings}>
            {najnovijiRecepti.map(recept => {
              const datum = new Date(recept.createdAt);
              const datumFormatirano = datum.toLocaleDateString('sr-RS'); // dd.mm.yyyy

              return (
                <div key={recept._id} className="recipe-card">
                  {recept.slika ? (
                    <img src={recept.slika} alt={recept.naziv} className="card-img" />
                  ) : (
                    <div className="card-img-placeholder">Nema slike</div>
                  )}
                  <div className="card-content">
                    <h4>{recept.naziv}</h4>
                    <button onClick={() => toggleSave(recept._id)} className="save-heart-btn">
                      {saved.includes(recept._id) ? <FaHeart /> : <FaRegHeart />}
                    </button>
                    <p><strong>⏱ Vreme:</strong> {recept.vreme}</p>
                    <p><strong>📅 Datum:</strong> {datumFormatirano}</p>

                    
                    <Link to={`/recepti/${recept._id}`} className="show-more-btn">
                      Prikaži više
                    </Link>
                  </div>
                </div>
              );
            })}
          </Slider>
        ) : (
          <p className="text-center">Nema recepata kreiranih u poslednjih 10 dana.</p>
        )}
      </div>


    </div>
  );
};

export default Recepti;
