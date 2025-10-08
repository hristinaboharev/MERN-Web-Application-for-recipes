import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/RecipeCategory.css';
import RecipeCard from '../components/RecipeCard';

const ReceptiKategorija = () => {
  const { kategorija } = useParams();
  const [recepti, setRecepti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // za pretragu

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

  // filtrirani recepti po searchTerm
  const filtriraniRecepti = recepti.filter(r =>
    r.naziv.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h2 className="ReceptiNaslov">Kategorija: {kategorija}</h2>

      {/* Search input centriran */}
      <div className="search-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Pretraži recepte po nazivu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>


      {loading ? (
        <div className="loading-spinner"></div>
      ) : filtriraniRecepti.length > 0 ? (
        <div className="recipe-grid">
          {filtriraniRecepti.map(recept => (
            <RecipeCard key={recept._id} recept={recept} />
          ))}
        </div>
      ) : (
        <p>Nema recepata koji odgovaraju pretrazi.</p>
      )}
    </div>
  );
};

export default ReceptiKategorija;
