import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/RecipeDetails.css';
import useImage from '../hooks/useImage';

import { CgProfile } from "react-icons/cg";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';

const ReceptDetalji = () => {
  const { id } = useParams();
  const [recept, setRecept] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Poziv hook-a NA VRHU, bez obzira da li je recept učitan
  const imageUrl = useImage(recept ? recept.slika : null);

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

  // Formatiranje datuma na latinici, dd.mm.yyyy.
  const formatDatum = (dateString) => {
    const d = new Date(dateString);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}.`;
  };

  return (
    <div className="container mt-5">
      <h2 className="recept-naslov">{recept.naziv}</h2>

      <div className="meta-info">
        <p>Datum kreiranja: {formatDatum(recept.createdAt)}</p>
        {recept.user && recept.user.username ? (
          <p className="autor">
            <AccountCircleIcon className="icon-profile" />
            <Link to={`/users/${recept.user._id}`} className="autor-link">
              {recept.user.username}
            </Link>
          </p>
        ) : (
          <p>Autor: Nepoznat</p>
        )}
      </div>

      <Divider sx={{ my: 2 }} />  

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
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={recept.naziv}
              className="img-recept"
            />
          ) : (
            <div className="img-placeholder">Nema slike</div>
          )}
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
