import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import "../styles/Recipes.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Pagination from "@mui/material/Pagination";



import { SavedContext } from "../components/SavedContext";
import RecipeCard from "../components/RecipeCard";
import { PrevArrow, NextArrow } from "../components/CustomArrows";
import Chatbot from "../components/Chatbot";


const Recepti = () => {
  const { kategorija } = useParams();
  const [recepti, setRecepti] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const { saved, toggleSave } = useContext(SavedContext);

  // Paginacija
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Fetch recepata iz backend-a
  useEffect(() => {
    let url = "http://localhost:5000/api/recepti";
    if (kategorija) url += `?kategorija=${kategorija}`;

    axios
      .get(url)
      .then((res) => setRecepti(res.data))
      .catch((err) => console.error(err));
  }, [kategorija]);

  // Slider - najnoviji recepti u poslednjih 10 dana
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

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 500, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="containerRecipe">
      {/* Header sa pozadinom */}
      <div
        className="header-container"
        style={{ backgroundImage: `url(/images/pozadina.jpg)` }}
      >
        <div className="header-content">
          <h1>Tvoj recept, naša inspiracija</h1>
          <h2>gde se tradicija i mašta sreću</h2>
        </div>
        <img
          src="/images/hamburger.png"
          alt="Hrana"
          className="food-overlay"
        />
      </div>

      {/* Grid sa receptima */}
      <h2>Svi recepti</h2>
      <div className="recipe-grid">
        {currentRecepti.length > 0 ? (
          currentRecepti.map((recept) => (
            <RecipeCard key={recept._id} recept={recept} />
          ))
        ) : (
          <p className="text-center">Nema dostupnih recepata.</p>
        )}
      </div>

      {/* Paginacija */}
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
          variant="outlined"
          color="primary"
          showFirstButton
          showLastButton
          sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
        />
      )}

      {/* Slider najnovijih recepata */}
      <div style={{ marginTop: 40 }}>
        <Divider className="custom-divider">
          <Chip label="Najnoviji recepti" />
        </Divider>
        {najnovijiRecepti.length > 0 ? (
          <Slider {...sliderSettings}>
            {najnovijiRecepti.map((recept) => (
              <RecipeCard key={recept._id} recept={recept} />
            ))}
          </Slider>
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
