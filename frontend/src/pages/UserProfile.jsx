import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/UserProfile.css';

import { CgProfile } from "react-icons/cg";

const UserProfile = () => {
  const { userId } = useParams();
  const [username, setUsername] = useState('');
  const [recepti, setRecepti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Dohvatanje recepta korisnika
    axios.get(`http://localhost:5000/api/recepti/korisnik/${userId}`)
      .then(res => {
        if (res.data.length > 0) {
          setUsername(res.data[0].user.username);
          setRecepti(res.data);
        } else {
          setUsername('Nepoznat korisnik');
          setRecepti([]);
        }
      })
      .catch(err => {
        console.error(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  // Funkcija za dobijanje pune putanje slike
  const getSlikaUrl = (putanja) => {
    if (!putanja) return '/default-image.jpg';

    if (putanja.startsWith('http://') || putanja.startsWith('https://')) {
      return putanja;
    }

    return `http://localhost:5000${putanja}`;
  };

  if (loading) return <p className="loading">Učitavanje...</p>;
  if (error) return <p className="error">Došlo je do greške pri učitavanju podataka.</p>;

  return (
    <div className="user-profile-container">
      <div className="username-box">
        <CgProfile className="userProfileIcon" />
        <h2>{username}</h2>
      </div>

      <div className="recipes-grid">
        {recepti.length > 0 ? (
          recepti.map(recept => (
            <Link to={`/recepti/${recept._id}`} key={recept._id} className="recipe-cardP">
              {recept.slika ? (
                <img
                  src={getSlikaUrl(recept.slika)}
                  alt={recept.naziv}
                  className="recipe-image"
                />
              ) : (
                <div className="no-image">Nema slike</div>
              )}
              <div className="recipe-name">{recept.naziv}</div>
            </Link>
          ))
        ) : (
          <p>Korisnik nema nijedan recept.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
