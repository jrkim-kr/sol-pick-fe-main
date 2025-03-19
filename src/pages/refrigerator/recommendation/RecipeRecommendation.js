import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RecipeRecommendation.css";
import Menu from "../../../components/common/menu/Menu";
import backArrow from "../../../assets/backArrow.svg";
import "../list/IngredientDetailList.css";
import Header from "../../../components/common/header/Header";

// 예제 데이터
const exampleRecipes = [
  { id: 1, name: "토마토 파스타", image: "/images/tomato_pasta.jpg" },
  { id: 2, name: "치킨 샐러드", image: "/images/2.jpg" },
  { id: 3, name: "바나나 팬케이크", image: "/images/3.jpg" },
  { id: 4, name: "연어 스테이크", image: "/images/4.jpg" },
  { id: 5, name: "볶음밥", image: "/images/5.jpg" },
  { id: 6, name: "오트밀 쿠키", image: "/images/6.jpg" },
];

const RecipeRecommendation = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecommendedRecipes();
  }, []);

  const fetchRecommendedRecipes = async () => {
    setRecipes(exampleRecipes);
  };

  // ✅ 특정 레시피 클릭 시 상세 페이지로 이동
  const goToRecipeDetail = (recipe) => {
    navigate(`/recipe-detail/${recipe.id}`, { state: { recipe } });
  };

  return (
    <>
      <Header
        leftIcon={backArrow}
        title="🍽️ 추천 레시피"
        onLeftClick={() => navigate("/refrigerator")}
      />
      <div className="recipe-recommendation-container">
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="recipe-card"
              onClick={() => goToRecipeDetail(recipe)} // ✅ 클릭 시 상세 페이지 이동
            >
              <img src={recipe.image} alt={recipe.name} className="recipe-image" />
              <p className="recipe-name">{recipe.name}</p>
            </div>
          ))}
        </div>
        <button className="refresh-button" onClick={fetchRecommendedRecipes}>
          다른 레시피 추천받기 🔄
        </button>
        <Menu />
      </div>
    </>
  );
};

export default RecipeRecommendation;
