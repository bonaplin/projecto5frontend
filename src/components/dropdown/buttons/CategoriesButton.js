import React from "react";
import { useNavigate } from "react-router-dom";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
export default function CategoriesButton() {
  function handleClick() {
    // console.log("CategoriesButton click");
    navigate("/categories");
  }
  const navigate = useNavigate();

  // console.log("CategoriesButton");
  return (
    <div onClick={handleClick} className="dropdown-button">
      <CategoryOutlinedIcon /> Categories
    </div>
  );
}
