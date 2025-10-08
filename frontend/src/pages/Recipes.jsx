import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "../styles/Recipes.css";

import Divider from "@mui/material/Divider";
import Pagination from "@mui/material/Pagination";

import { SavedContext } from "../components/SavedContext";
import RecipeCard from "../components/RecipeCard";
import Chatbot from "../components/Chatbot";

const Recepti = () => {
  const { kategorija } = useParams();
  const [recepti, setRecepti] = useState([]);
  const { saved, toggleSave } = useContext(SavedContext);

  // Paginacija
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Pretraga
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  // Fetch recepata iz backend-a
  useEffect(() => {
    let url = "http://localhost:5000/api/recepti";
    if (kategorija) url += `?kategorija=${kategorija}`;

    axios
      .get(url)
      .then((res) => setRecepti(res.data))
      .catch((err) => console.error(err));
  }, [kategorija]);

  // Pretraga recepata po nazivu
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredResults([]);
      return;
    }

    const results = recepti.filter((recept) =>
      recept.naziv.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(results);
  }, [searchTerm, recepti]);

  // Najnoviji recepti u poslednjih 10 dana
  const danas = new Date();
  const desetDanaUnazad = new Date();
  desetDanaUnazad.setDate(danas.getDate() - 10);

  const najnovijiRecepti = recepti.filter((r) => {
    const datum = new Date(r.createdAt);
    return datum >= desetDanaUnazad && datum <= danas;
  });

  // Paginarani recepti za grid
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecepti = recepti.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(recepti.length / itemsPerPage);

  // Ref za horizontalni scroll
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  // Koji recepti da se prikazu u gridu
  const prikazaniRecepti = searchTerm ? filteredResults : currentRecepti;

  return (
    <div className="containerRecipe">
      {/* Naslov */}
      <h2 className="ReceptiNaslov">Svi recepti</h2>

      {/* Search bar desno ispod naslova */}
      <div className="search-inline-container">
        <input
          type="text"
          placeholder="Pretraži recepte..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input-inline"
        />
      </div>

      {/* Grid sa receptima */}
      <div className="recipe-grid">
        {prikazaniRecepti.length > 0 ? (
          prikazaniRecepti.map((recept) => (
            <RecipeCard key={recept._id} recept={recept} />
          ))
        ) : (
          <p className="text-center">Nema dostupnih recepata.</p>
        )}
      </div>

      {/* Paginacija */}
      {!searchTerm && totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
          variant="outlined"
          showFirstButton
          showLastButton
          className="my-pagination"
        />
      )}

      {/* Horizontalni scroll za najnovije recepte */}
      <div style={{ marginTop: 40 }}>
        <Divider sx={{ my: 2 }} />
        <h3 className="ReceptiNaslov">Najnoviji recepti</h3>

        {najnovijiRecepti.length > 0 ? (
          <div className="horizontal-scroll-container">
            <button className="scroll-btn left" onClick={() => scroll("left")}>
              ‹
            </button>
            <div className="horizontal-scroll" ref={scrollRef}>
              {najnovijiRecepti.map((recept) => (
                <RecipeCard key={recept._id} recept={recept} />
              ))}
            </div>
            <button className="scroll-btn right" onClick={() => scroll("right")}>
              ›
            </button>
          </div>
        ) : (
          <p className="text-center">
            Nema recepata kreiranih u poslednjih 10 dana.
          </p>
        )}
      </div>

      <Chatbot />
    </div>
  );
};

export default Recepti;
