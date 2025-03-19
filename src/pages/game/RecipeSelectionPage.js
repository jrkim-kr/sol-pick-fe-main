import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  saveSelectedRecipe,
  initializeDiscoveredIngredients,
} from "../../api/GameApi";
import RecipeSelection from "../../components/game/RecipeSelection";
import Header from "../../components/common/header/Header";
import backArrow from "../../assets/backArrow.svg";
import close from "../../assets/close.svg";
import "./RecipeSelectionPage.css";

const RecipeSelectionPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 네비게이션 핸들러
  const handleBack = () => navigate(-1);
  const handleClose = () => navigate("/card");

  // 레시피 선택 완료 후 처리
  const handleNext = async (selectedRecipeId) => {
    if (!selectedRecipeId) {
      setError("레시피를 선택해주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. 선택한 레시피 서버에 저장
      console.log(
        `레시피 ID ${selectedRecipeId}를 선택했습니다. 서버에 저장합니다.`
      );
      await saveSelectedRecipe(selectedRecipeId);

      // 2. 식재료 발견 정보 초기화
      console.log(
        `레시피 ID ${selectedRecipeId}의 식재료 정보를 초기화합니다.`
      );
      await initializeDiscoveredIngredients(selectedRecipeId);

      // 3. 다음 페이지로 이동
      navigate("/game/greeting");
    } catch (error) {
      console.error("레시피 선택 처리 중 오류 발생:", error);
      setError("레시피 선택 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  // 사용자 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // 커스텀 헤더 스타일 정의
  const customHeaderStyle = {
    fontFamily: "'Kablammo', cursive",
    // 필요한 경우 추가 스타일 속성 지정
    fontSize: "24px",
  };

  return (
    <div className="recipe-selection-page-container">
      <Header
        leftIcon={backArrow}
        title="Foody Cat"
        rightIcon={close}
        onLeftClick={handleBack}
        onRightClick={handleClose}
        titleStyle={customHeaderStyle} // 커스텀 스타일 전달
      />

      <div className="recipe-selection-component-container">
        <RecipeSelection onNext={handleNext} />
      </div>

      {/* <Menu /> */}
    </div>
  );
};

export default RecipeSelectionPage;
