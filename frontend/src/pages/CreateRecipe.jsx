import React, { useState } from 'react';
import '../styles/CreateRecipe.css';

const kategorije = [
  'Doručak',
  'Ručak',
  'Večera',
  'Zdrav obrok',
  'Dezert'
];

const CreateRecipe = () => {
  const [naslov, setNaslov] = useState('');
  const [slika, setSlika] = useState(null);
  const [sastojci, setSastojci] = useState(['']);
  const [priprema, setPriprema] = useState(['']);
  const [kategorija, setKategorija] = useState('');
  const [loading, setLoading] = useState(false);

  // Dodaj sastojak
  const dodajSastojak = () => setSastojci([...sastojci, '']);
  // Ukloni sastojak
  const ukloniSastojak = (index) => setSastojci(sastojci.filter((_, i) => i !== index));
  // Promeni sastojak
  const promeniSastojak = (index, value) => {
    const novi = [...sastojci];
    novi[index] = value;
    setSastojci(novi);
  };

  // Dodaj korak pripreme
  const dodajKorak = () => setPriprema([...priprema, '']);
  // Ukloni korak pripreme
  const ukloniKorak = (index) => setPriprema(priprema.filter((_, i) => i !== index));
  // Promeni korak pripreme
  const promeniKorak = (index, value) => {
    const novi = [...priprema];
    novi[index] = value;
    setPriprema(novi);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSlika(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Morate biti ulogovani da biste dodali recept.');
            setLoading(false);
            return;
        }

        // Čistimo prazne stavke iz sastojaka i pripreme
        const cistiSastojci = sastojci.filter(s => s.trim() !== '');
        const cistaPriprema = priprema.filter(p => p.trim() !== '');

        const formData = new FormData();
        formData.append('naziv', naslov);
        formData.append('kategorija', JSON.stringify([kategorija]));
        formData.append('sastojci', JSON.stringify(cistiSastojci));
        formData.append('priprema', JSON.stringify(cistaPriprema));
        if (slika) {
            formData.append('slika', slika);
        }

        const response = await fetch('http://localhost:5000/api/recepti', {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${token}`
            },
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Greška pri slanju recepta');
        }

        alert('Recept uspešno dodat!');
        // Reset forme
        setNaslov('');
        setSlika(null);
        setSastojci(['']);
        setPriprema(['']);
        setKategorija('');

        } catch (error) {
        alert(error.message);
        } finally {
        setLoading(false);
    }
  };

  return (
    <form className="create-recipe-grid" onSubmit={handleSubmit}>

      {/* Leva kolona */}
      <div className="left-column">
        <label>Naslov recepta</label>
        <input
          type="text"
          placeholder="Naziv recepta"
          value={naslov}
          onChange={e => setNaslov(e.target.value)}
          required
        />

        <label>Dodaj glavnu sliku</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {slika && (
          <img
            src={URL.createObjectURL(slika)}
            alt="Preview"
            style={{ marginTop: 10, maxWidth: '100%' }}
          />
        )}
      </div>

      {/* Srednja kolona */}
      <div className="middle-column">
        <label>Sastojci</label>
        {sastojci.map((s, i) => (
          <div key={i} className="sastojak-row">
            <input
              type="text"
              placeholder={`Sastojak #${i + 1}`}
              value={s}
              onChange={e => promeniSastojak(i, e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => ukloniSastojak(i)}
              disabled={sastojci.length === 1}
            >
              x
            </button>
          </div>
        ))}
        <button type="button" onClick={dodajSastojak}>Dodaj sastojak</button>

        <label>Priprema (koraci)</label>
        {priprema.map((korak, i) => (
          <div key={i} className="sastojak-row">
            <textarea
              placeholder={`Korak #${i + 1}`}
              value={korak}
              onChange={e => promeniKorak(i, e.target.value)}
              rows={3}
              required
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={() => ukloniKorak(i)}
              disabled={priprema.length === 1}
            >
              x
            </button>
          </div>
        ))}
        <button type="button" onClick={dodajKorak}>Dodaj korak</button>
      </div>

      {/* Desna kolona */}
      <div className="right-column">
        <label>Kategorija</label>
        <select
          value={kategorija}
          onChange={e => setKategorija(e.target.value)}
          required
        >
          <option value="">Odaberi</option>
          {kategorije.map(kat => (
            <option key={kat} value={kat}>{kat}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="submit-btn">Sačuvaj recept</button>

      {loading ? 'Čuvanje...' : 'Sačuvaj recept'}
    </form>
  );
};

export default CreateRecipe;
