import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/IngredientSearch.css';

const Namirnice = () => {
  const [unos, setUnos] = useState('');
  const [rezultati, setRezultati] = useState([]);

  const handlePretraga = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/recepti/pretraga?sastojak=${unos}`);
      setRezultati(res.data);
    } catch (err) {
      console.error('Greška pri pretrazi', err);
    }
  };

  return (
    <div className="namirnice-container"   style={{
    backgroundImage: "url('/images/background.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',}}>
      <h2>Koje namirnice imaš?</h2>
      <div className="namirnice-input-group">
        <input
          type="text"
          value={unos}
          onChange={e => setUnos(e.target.value)}
          placeholder="Unesi npr. banana"
          className="form-control"
        />
        <button className="btn dugme-plavo" onClick={handlePretraga}>
          Pronađi
        </button>
      </div>

      <div style={{ marginTop: '30px' }}>
        {rezultati.length ? (
          <>
            <h4>Recepti koji sadrže "{unos}":</h4>
            {rezultati.map(r => (
              <Link to={`/recepti/${r._id}`} key={r._id} className="rezultat-kartica">
                {r.slika ? (
                  <img src={r.slika} alt={r.naziv} className="kartica-slika" />
                ) : (
                  <div className="kartica-slika-placeholder">Nema slike</div>
                )}
                <div className="kartica-sadrzaj">
                  <h5>{r.naziv}</h5>
                  <p><strong>Sastojci:</strong> {r.sastojci.join(', ')}</p>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <p style={{ marginTop: '20px' }}>Nema rezultata...</p>
        )}
      </div>
    </div>
  );
};

export default Namirnice;
