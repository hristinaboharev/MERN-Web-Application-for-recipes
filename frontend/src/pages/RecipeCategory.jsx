import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/RecipeCategory.css';
import RecipeCard from '../components/RecipeCard'; // importovanje kartice

const ReceptiKategorija = () => {
  const { kategorija } = useParams();
  const [recepti, setRecepti] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/recepti')
      .then(res => {
        const normalize = str => 
          str
            .normalize("NFD")                     //razdvaja slova (npr. 'č' postaje 'c')
            .replace(/[\u0300-\u036f]/g, "")     //uklanja sve dijakritike (accent-e)
            .toLowerCase()                        
            .trim();                              


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
