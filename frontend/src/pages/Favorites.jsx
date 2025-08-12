import { useContext, useEffect, useState } from "react";
import { SavedContext } from "../components/SavedContext";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/IngredientSearch.css"; // koristi isti css kao namirnice
import { FaHeart } from "react-icons/fa";

const Favorites = () => {
  const { saved, toggleSave } = useContext(SavedContext);
  const [recepti, setRecepti] = useState([]);

  useEffect(() => {
    if (saved.length === 0) {
      setRecepti([]); // očisti listu ako nema sačuvanih
      return;
    }
    axios
      .post("http://localhost:5000/api/recepti/rezervisi-po-id", { ids: saved })
      .then((res) => setRecepti(res.data))
      .catch((err) => console.error(err));
  }, [saved]);

  // Funkcija za dobijanje punog URL slike
  const getSlikaUrl = (putanja) => {
    if (!putanja) return '/default-image.jpg';

    if (putanja.startsWith('http://') || putanja.startsWith('https://')) {
      return putanja;
    }

    return `http://localhost:5000${putanja}`;
  };

  return (
    <div className="namirnice-container">
      <h2>Sačuvani recepti</h2>
      {recepti.length > 0 ? (
        recepti.map((recept) => (
          <Link
            to={`/recepti/${recept._id}`}
            key={recept._id}
            className="rezultat-kartica"
          >
            {recept.slika ? (
              <img
                src={getSlikaUrl(recept.slika)}
                alt={recept.naziv}
                className="kartica-slika"
              />
            ) : (
              <div className="kartica-slika-placeholder">Nema slike</div>
            )}
            <div className="kartica-sadrzaj">
              <h5>{recept.naziv}</h5>
              <p>⏱ Vreme pripreme: {recept.vreme || "N/A"}</p>
              <button
                // CSS u namirnice.css
                className="prikazi-vise-btn ukloni"
                onClick={(e) => {
                  e.preventDefault();
                  toggleSave(recept._id);
                }}
                title="Ukloni iz sačuvanih"
                style={{ marginTop: "auto", alignSelf: "flex-start" }}
              >
                <FaHeart />
              </button>
            </div>
          </Link>
        ))
      ) : (
        <p>Nema sačuvanih recepata.</p>
      )}
    </div>
  );
};

export default Favorites;
