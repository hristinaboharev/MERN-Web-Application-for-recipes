import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { SavedContext } from "./SavedContext";
import useImage from "../hooks/useImage";

const FavoriteCard = ({ recept }) => {
  const { toggleSave } = useContext(SavedContext);
  const imageUrl = useImage(recept.slika);

  return (
    <div className="rezultat-kartica">
      {imageUrl ? (
        <img src={imageUrl} alt={recept.naziv} className="kartica-slika" />
      ) : (
        <div className="kartica-slika-placeholder">Nema slike</div>
      )}

      {/* Sadržaj kao link */}
      <Link 
        to={`/recepti/${recept._id}`} 
        
        className="kartica-sadrzaj" 
        style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column" }}
      >
        <h5>{recept.naziv}</h5>
        <p>Vreme pripreme: {recept.vreme || "N/A"}</p>
        <p>Kategorije: {recept.kategorija.map((k) => k.naziv).join(", ")}</p>
      </Link>

      {/* Dugme za uklanjanje */}
      <button
        className="prikazi-vise-btn ukloni"
        onClick={() => toggleSave(recept._id)}
        title="Ukloni iz sačuvanih"
        style={{ marginTop: "auto", alignSelf: "flex-start" }}
      >
        <FaHeart />
      </button>
    </div>
  );
};

export default FavoriteCard;
