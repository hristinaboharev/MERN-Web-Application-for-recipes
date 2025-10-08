import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/UserProfile.css';
import { CgProfile } from "react-icons/cg";
import DeleteIcon from '@mui/icons-material/Delete';
import { getCurrentUser } from '../utils/auth';

const UserProfile = () => {
  const { userId } = useParams();
  const [username, setUsername] = useState('');
  const [recepti, setRecepti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const currentUser = getCurrentUser(); // { id, username, email }

  useEffect(() => {
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

  const getSlikaUrl = (putanja) => {
    if (!putanja) return '/default-image.jpg';
    if (putanja.startsWith('http://') || putanja.startsWith('https://')) return putanja;
    return `http://localhost:5000${putanja}`;
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Da li ste sigurni da želite da obrišete recept?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/recepti/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setRecepti(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      console.error(err);
      alert('Došlo je do greške pri brisanju recepta');
    }
  };

  if (loading) return <p className="loading">Učitavanje...</p>;
  if (error) return <p className="error">Došlo je do greške pri učitavanju podataka.</p>;

  return (
    <div className="user-profile-container">
      <div className="username-box">
        <CgProfile className="userProfileIcon" />
        <div>
          <h2>{username}</h2>
          <p className='total-recipes'>
            Ukupno: {recepti.length} {recepti.length === 1 ? "recept" : "recepta"}
          </p>
        </div>
      </div>

      {/* Tekst za aktivaciju režima brisanja */}
      {currentUser?.id === userId && (
        <div className="delete-mode-toggle">
          <button onClick={() => setDeleteMode(prev => !prev)}>
            {deleteMode ? 'Otkaži' : 'Obriši recept'}
          </button>
        </div>
      )}

      <div className="recipes-grid">
        {recepti.length > 0 ? (
          recepti.map(recept => (
            <div key={recept._id} className="recipe-card-wrapper">
              <Link to={`/recepti/${recept._id}`} className="recipe-cardP">
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

              {/* Dugme za brisanje koje vidi samo vlasnik */}
              {deleteMode && currentUser?.id === userId && (
                <button className="delete-btn" onClick={() => handleDelete(recept._id)}>
                  <DeleteIcon fontSize="small" />
                </button>
              )}
            </div>
          ))
        ) : (
          <p>Korisnik nema nijedan recept.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
