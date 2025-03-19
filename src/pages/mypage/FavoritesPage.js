import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/header/Header";
import Menu from "../../components/common/menu/Menu";
import backArrow from "../../assets/backArrow.svg";
import ToastMessage from "../../components/common/toastmessage/ToastMessage";
import FavoritesContent from "../../components/mypage/favorites/FavoritesContent";
import { recipeApi } from "../../api/RecipeApi";
import "./FavoritesPage.css";

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        setLoading(true);
        const recipes = await recipeApi.getLikedRecipes();
        setFavoriteRecipes(recipes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorite recipes:", error);
        setError("찜한 레시피를 불러오는데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchFavoriteRecipes();
  }, []);

  const handleRecipeClick = (recipe) => {
    // Navigate to recipe detail page with recipe data in state
    navigate(`/mypage/recipe/${recipe.id}`, {
      state: {
        recipe: {
          ...recipe,
          mainImage: recipe.image, // RecipeNotebook 컴포넌트에서 mainImage로 사용됨
        },
      },
    });
  };

  return (
    <div className="favorites-page-container">
      <Header
        leftIcon={backArrow}
        title="찜한 레시피"
        onLeftClick={() => navigate("/mypage")}
      />

      <div className="favorites-page-content">
        <FavoritesContent
          recipes={favoriteRecipes}
          loading={loading}
          error={error}
          onRecipeClick={handleRecipeClick}
        />
      </div>

      {showToast && <ToastMessage message={toastMessage} duration={3000} />}
      <Menu />
    </div>
  );
};

export default FavoritesPage;
