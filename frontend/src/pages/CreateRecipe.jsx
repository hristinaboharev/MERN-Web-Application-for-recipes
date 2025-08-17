import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CreateRecipe.css';

const CreateRecipe = () => {
  const [naslov, setNaslov] = useState('');
  const [slika, setSlika] = useState(null);
  const [sastojci, setSastojci] = useState(['']);
  const [priprema, setPriprema] = useState(['']);
  const [kategorije, setKategorije] = useState([]);
  const [odabraneKategorije, setOdabraneKategorije] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/kategorije')
      .then(res => setKategorije(res.data))
      .catch(err => console.error(err));
  }, []);

  const dodajSastojak = () => setSastojci([...sastojci, '']);
  const ukloniSastojak = (i) => setSastojci(sastojci.filter((_, idx) => idx !== i));
  const promeniSastojak = (i, v) => {
    const n = [...sastojci]; n[i] = v; setSastojci(n);
  };

  const dodajKorak = () => setPriprema([...priprema, '']);
  const ukloniKorak = (i) => setPriprema(priprema.filter((_, idx) => idx !== i));
  const promeniKorak = (i, v) => {
    const n = [...priprema]; n[i] = v; setPriprema(n);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) setSlika(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    if (!token) { alert('Morate biti ulogovani.'); setLoading(false); return; }

    try {
      const formData = new FormData();
      formData.append('naziv', naslov);
      formData.append('sastojci', JSON.stringify(sastojci.filter(s => s.trim() !== '')));
      formData.append('priprema', JSON.stringify(priprema.filter(p => p.trim() !== '')));
      formData.append('kategorija', JSON.stringify(odabraneKategorije));
      if (slika) formData.append('slika', slika);

      const res = await fetch('http://localhost:5000/api/recepti', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Greška pri slanju recepta');
      }

      alert('Recept dodat!');
      setNaslov('');
      setSlika(null);
      setSastojci(['']);
      setPriprema(['']);
      setOdabraneKategorije([]);
    } catch (err) {
      alert(err.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="create-recipe-container">
      <div className="top-button-container">
        <button type="submit" className="submit-btn-top-right" onClick={handleSubmit}>
          {loading ? 'Čuvanje...' : 'Sačuvaj recept'}
        </button>
      </div>

      <form className="create-recipe-grid">

        <div className="left-column">
          <label>Naslov recepta</label>
          <input type="text" placeholder="Naziv recepta" value={naslov} onChange={e => setNaslov(e.target.value)} required />
          <label>Dodaj glavnu sliku</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {slika && <img src={URL.createObjectURL(slika)} alt="preview" className="img-preview" />}
        </div>

        <div className="middle-column">
          <label>Sastojci</label>
          {sastojci.map((s, i) => (
            <div key={i} className="sastojak-row">
              <input type="text" value={s} placeholder={`Sastojak #${i + 1}`} onChange={e => promeniSastojak(i, e.target.value)} required />
              <button type="button" onClick={() => ukloniSastojak(i)} disabled={sastojci.length === 1}>x</button>
            </div>
          ))}
          <button type="button" onClick={dodajSastojak}>Dodaj sastojak</button>

          <label>Priprema (koraci)</label>
          {priprema.map((p, i) => (
            <div key={i} className="sastojak-row">
              <textarea value={p} onChange={e => promeniKorak(i, e.target.value)} placeholder={`Korak #${i + 1}`} rows={3} required />
              <button type="button" onClick={() => ukloniKorak(i)} disabled={priprema.length === 1}>x</button>
            </div>
          ))}
          <button type="button" onClick={dodajKorak}>Dodaj korak</button>
        </div>

        <div className="right-column">
          <label>Kategorije</label>
          <div className="categories-checkbox">
            {kategorije.map(k => (
              <label key={k._id} className="category-checkbox">
                <input
                  type="checkbox"
                  value={k._id}
                  checked={odabraneKategorije.includes(k._id)}
                  onChange={e => {
                    if (e.target.checked) setOdabraneKategorije([...odabraneKategorije, k._id]);
                    else setOdabraneKategorije(odabraneKategorije.filter(id => id !== k._id));
                  }}
                />
                {k.naziv}
              </label>
            ))}
          </div>

          <div className="selected-categories">
            {odabraneKategorije.map(id => {
              const kat = kategorije.find(k => k._id === id);
              return kat ? (
                <span key={id} className="category-tag">
                  {kat.naziv}
                  <button type="button" className="remove-tag-btn" onClick={() => setOdabraneKategorije(prev => prev.filter(i => i !== id))}>x</button>
                </span>
              ) : null;
            })}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
