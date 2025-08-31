import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const arrowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
  width: "40px",
  height: "40px",
  background: "rgba(0,0,0,0.5)",
  color: "#fff",
  fontSize: "20px",
  borderRadius: "50%",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  transition: "all 0.3s ease",
};

export const PrevArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, ...arrowStyle, left: "-25px" }}
    onClick={onClick}
    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.8)")}
    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.5)")}
  >
    <FaChevronLeft />
  </div>
);

export const NextArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, ...arrowStyle, right: "-25px" }}
    onClick={onClick}
    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.8)")}
    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.5)")}
  >
    <FaChevronRight />
  </div>
);
