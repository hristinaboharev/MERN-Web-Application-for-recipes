import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/RecipeCategory.css';
import RecipeCard from '../components/RecipeCard';

const ReceptiKategorija = () => {
  const { kategorija } = useParams();
  const [recepti, setRecepti] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecepti = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/recepti/kategorija/${encodeURIComponent(kategorija)}`);
        setRecepti(res.data);
      } catch (err) {
        console.error(err);
        setRecepti([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecepti();
  }, [kategorija]);

  return (
    <div className="container py-4">
      <h2>Kategorija: {kategorija}</h2>

      {loading ? (
        <div className="loading-spinner"></div>
      ) : recepti.length > 0 ? (
        <div className="recipe-grid">
          {recepti.map(recept => (
            <RecipeCard key={recept._id} recept={recept} />
          ))}
        </div>
      ) : (
        <p>Nema recepata u ovoj kategoriji.</p>
      )}
    </div>
  );
};

export default ReceptiKategorija;
