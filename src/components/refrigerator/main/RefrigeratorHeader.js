import React from "react";
import plus from "../../../assets/plus.svg";
import detailArrow from "../../../assets/detailArrow.svg";
import "./RefrigeratorHeader.css";
import { useNavigate } from "react-router-dom";

const RefrigeratorHeader = ({ totalIngredients, onAddClick }) => {
  const navigate = useNavigate();

  return (
    <header className="refrigerator-header-container">
      <div className="refrigerator-header">
        <div className="title-section">
          <h3 className="refrigerator-header-title bold">나의 냉장고</h3>

          <div className="ingredient-add-row-button" onClick={onAddClick}>
            <p className="ingredient-add-ment">추가하기</p>
            <img src={plus} alt="plus" className="plus-icon" />
          </div>
        </div>

        <div
          className="detail-section"
          onClick={() => navigate("/refrigerator/list")}
        >
          <p className="total-quantity">총 {totalIngredients}개</p>
          <img
            src={detailArrow}
            alt="detailArrow"
            className="detailArrow-icon"
          />
        </div>
      </div>
    </header>
  );
};

export default RefrigeratorHeader;
