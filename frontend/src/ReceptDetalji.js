import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ReceptDetalji.css';

const ReceptDetalji = () => {
  const { id } = useParams();
  const [recept, setRecept] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/recepti/${id}`)
      .then(response => setRecept(response.data))
      .catch(err => {
        console.error('Greška pri učitavanju:', err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-5">Učitavanje...</p>;
  if (error) return <p className="text-center mt-5 text-danger">Greška pri učitavanju recepta.</p>;
  if (!recept) return <p className="text-center mt-5">Recept nije pronađen.</p>;

  // Ako je priprema string sa novim redovima, podeli na niz
  const pripremaNiz = 
    typeof recept.priprema === 'string' 
      ? recept.priprema.split('\n').filter(line => line.trim() !== '') 
      : Array.isArray(recept.priprema) 
        ? recept.priprema 
        : [];

  return (
    <div className="container mt-5">
      <h2 className="recept-naslov">{recept.naziv}</h2>

      <div className="flex-row mb-4">
        <div>
          <h5 className="section-title">Sastojci:</h5>
          <ul className="sastojci-lista">
            {recept.sastojci.map((sastojak, index) => (
              <li key={index}>{sastojak}</li>
            ))}
          </ul>
        </div>

        <div>
          <img
            src={recept.slika || '/default-image.jpg'}
            alt={recept.naziv}
            className="img-recept"
          />
        </div>
      </div>

      <div>
        <h5 className="section-title">Priprema:</h5>
        {pripremaNiz.length > 0 ? (
          pripremaNiz.map((korak, i) => (
            <p key={i} className="preparation">{korak}</p>
          ))
        ) : (
          <p className="preparation">Nema dostupnih detalja pripreme.</p>
        )}
      </div>

      <div className="mt-4">
        <Link to="/" className="show-more-btn">
          ← Nazad na listu recepata
        </Link>
      </div>
    </div>
  );
};

export default ReceptDetalji;
