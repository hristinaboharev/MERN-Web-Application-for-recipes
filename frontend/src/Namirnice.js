import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Koje namirnice imaš?</h2>
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
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
              <div key={r._id} className="card mb-3 p-3" style={{ background: '#FFF8F0' }}>
                <h5>{r.naziv}</h5>
                <p><strong>Sastojci:</strong> {r.sastojci.join(', ')}</p>
                <Link
                  to={`/recepti/${r._id}`}
                  className="btn dugme-plavo"
                >
                  Prikaži više
                </Link>
              </div>
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
