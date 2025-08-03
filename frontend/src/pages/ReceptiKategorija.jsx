// src/pages/ReceptiKategorija.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../styles/ReceptiKategorija.css';

const ReceptiKategorija = () => {
  const { kategorija } = useParams();
  const [recepti, setRecepti] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/recepti')
      .then(res => {
        
        const normalize = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
        const filtrirani = res.data.filter(r => {
        if (Array.isArray(r.kategorija)) {
            return r.kategorija.some(k => normalize(k) === normalize(kategorija));
        }
        return normalize(r.kategorija) === normalize(kategorija);
        });

        setRecepti(filtrirani);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [kategorija]);


  return (
    <div className="container py-4">
      <h2>Kategorija: {kategorija}</h2>
      {loading ? (
        <div className="loading-spinner"></div>
      ) : recepti.length > 0 ? (
        <div className="recipe-grid">
          {recepti.map(recept => (
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
        </div>
      ) : (
        <p>Nema recepata u ovoj kategoriji.</p>
      )}
    </div>
  );
};

export default ReceptiKategorija;
