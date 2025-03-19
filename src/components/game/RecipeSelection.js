import React, { useState, useEffect } from "react";
import "./RecipeSelection.css";
import recipes from "./RecipeData";
import {
  saveSelectedRecipe,
  getSelectedRecipe,
} from "../../utils/game/storageUtils";

const RecipeSelection = ({ onNext }) => {
  // 선택된 레시피 ID 상태
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  // 레시피 선택 핸들러
  const handleSelectRecipe = (recipeId) => {
    setSelectedRecipeId(recipeId);
    console.log("레시피 선택:", recipeId);
  };

  // 선택 완료 및 다음 단계로 이동
  const handleContinue = () => {
    if (selectedRecipeId) {
      // 상위 컴포넌트의 onNext 함수 호출하여 선택한 레시피 ID 전달
      onNext(selectedRecipeId);
    }
  };

  // // 컴포넌트 마운트 시 기존에 저장된 레시피 ID 확인
  // useEffect(() => {
  //   const savedRecipeId = getSelectedRecipe();
  //   console.log("Initial selected recipe ID:", savedRecipeId);

  //   if (savedRecipeId) {
  //     setSelectedRecipeId(savedRecipeId);
  //   }
  // }, []);

  // // 선택 완료 및 다음 단계로 이동
  // const handleContinue = () => {
  //   if (selectedRecipeId) {
  //     // 로컬 스토리지에 선택한 레시피 저장
  //     saveSelectedRecipe(selectedRecipeId);
  //     // 다음 단계로 이동
  //     onNext();
  //   }
  // };

  return (
    <div className="recipe-selection-container">
      <div className="recipe-selection-content">
        <div className="recipe-title-container">
          <h2 className="recipe-title">받고 싶은 레시피를 골라주세요</h2>
          <p className="recipe-description">
            레시피에 맞게 최적의 혜택을 주는 포인트가 쌓여요
          </p>
        </div>

        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className={`recipe-card ${
                recipe.id === selectedRecipeId ? "selected" : ""
              }`}
              onClick={() => handleSelectRecipe(recipe.id)}
            >
              <img
                src={recipe.imagePath}
                alt={recipe.name}
                className="recipe-image-selection"
                onError={(e) => {
                  console.error(
                    `Failed to load image for recipe ${recipe.id}:`,
                    recipe.imagePath
                  );
                  e.target.src =
                    "https://via.placeholder.com/200x200?text=Image+Not+Found";
                }}
              />
              <p className="game-recipe-name">{recipe.name}</p>
            </div>
          ))}
        </div>

        <div className="help-section">
          <button className="help-button">
            <span>[필수] 개인 정보 수집 및 이용 동의</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 3L11 8L6 13"
                stroke="#888888"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <button
          className="recipe-continue-button"
          onClick={handleContinue}
          disabled={selectedRecipeId === null}
        >
          동의하고 시작하기
        </button>
      </div>
    </div>
  );
};

export default RecipeSelection;
