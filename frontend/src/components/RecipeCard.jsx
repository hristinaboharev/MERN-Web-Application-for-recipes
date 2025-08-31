import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SavedContext } from "./SavedContext";
import useImage from "../hooks/useImage";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const RecipeCard = ({ recept }) => {
  const { saved, toggleSave } = useContext(SavedContext);
  const imageUrl = useImage(recept.slika);

  const datum = recept.createdAt ? new Date(recept.createdAt) : null;
  const datumFormatirano = datum ? datum.toLocaleDateString("sr-RS") : "";

  return (
    <Link to={`/recepti/${recept._id}`} className="recipe-card">
      {imageUrl ? (
        <img src={imageUrl} alt={recept.naziv} className="card-img" />
      ) : (
        <div className="card-img-placeholder">Nema slike</div>
      )}
      <div className="card-content">
        <h4>{recept.naziv}</h4>

        {recept.kategorija && recept.kategorija.length > 0 && (
          <p className="categories">
            <strong>Kategorija:</strong>{" "}
            {recept.kategorija.map((k) => k.naziv).join(", ")}
          </p>
        )}

        <button
          onClick={(e) => {
            e.preventDefault(); // Sprečava navigaciju kada se klikne na dugme
            toggleSave(recept._id);
          }}
          className="save-heart-btn"
        >
          {saved.includes(recept._id) ? (
            <FavoriteIcon style={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </button>

        {recept.vreme && (
          <p>
            <strong>Vreme:</strong> {recept.vreme}
          </p>
        )}
        {datum && (
          <p>
            <strong>Datum:</strong> {datumFormatirano}
          </p>
        )}
      </div>
    </Link>
  );
};

export default RecipeCard;
