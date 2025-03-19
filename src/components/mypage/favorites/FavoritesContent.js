import React from "react";
import "./FavoritesContent.css";
import plateImage from "../../../assets/recipe/plate.png"; // Import the plate image

const FavoritesContent = ({ recipes, loading, error, onRecipeClick }) => {
  if (loading) {
    return <div className="favorites-loading">레시피를 불러오는 중...</div>;
  }

  if (error) {
    return <div className="favorites-error">{error}</div>;
  }

  if (recipes.length === 0) {
    return (
      <div className="favorites-empty">
        <p>찜한 레시피가 없습니다.</p>
        <p>마음에 드는 레시피를 찜해보세요!</p>
      </div>
    );
  }

  return (
    <div className="favorites-content">
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="recipe-plate-container"
            onClick={() => onRecipeClick(recipe)}
          >
            <div className="plate-wrapper">
              <img src={plateImage} alt="Plate" className="plate-image" />
              <div className="recipe-image-container">
                <img src={recipe.image} alt={recipe.name} className="recipe-image" />
              </div>
            </div>
            <br />
            <p>{recipe.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesContent;