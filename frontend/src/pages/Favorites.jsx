import { useContext, useEffect, useState } from "react";
import { SavedContext } from "../components/SavedContext";
import axios from "axios";
import "../styles/IngredientSearch.css"; 
import FavoriteCard from "../components/FavoriteCard";

const Favorites = () => {
  const { saved } = useContext(SavedContext);
  const [recepti, setRecepti] = useState([]);

  useEffect(() => {
    if (saved.length === 0) {
      setRecepti([]);
      return;
    }

    axios
      .post("http://localhost:5000/api/recepti/rezervisi-po-id", { ids: saved })
      .then((res) => setRecepti(res.data))
      .catch((err) => console.error(err));
  }, [saved]);

  return (
    <div className="namirnice-container">
      <h2>Sačuvani recepti</h2>
      {recepti.length > 0 ? (
        recepti.map((recept) => <FavoriteCard key={recept._id} recept={recept} />)
      ) : (
        <p>Nema sačuvanih recepata.</p>
      )}
    </div>
  );
};

export default Favorites;
