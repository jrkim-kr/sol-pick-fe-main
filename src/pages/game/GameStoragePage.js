import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GameStoragePage.css";

// 카드 디자인 컴포넌트
import GameBackground from "../../components/game/GameBackground";
import GameStorageList from "../../components/game/GameStorageList";
import { getCompletedRecipes } from "../../api/GameApi";
import { authApi } from "../../api/AuthApi";

// 필요한 아이콘 import
import backArrow from "../../assets/backArrow.svg";
import close from "../../assets/close.svg";

// 헤더 및 푸터 관련 컴포넌트
import Header from "../../components/common/header/Header";

const GameStoragePage = () => {
  const navigate = useNavigate();
  const [completedRecipes, setCompletedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API에서 완성된 레시피 데이터를 가져오는 함수
    const fetchCompletedRecipes = async () => {
      try {
        setLoading(true);

        // 사용자 정보 가져오기
        const currentUser = authApi.getCurrentUser();

        if (currentUser && currentUser.memberId) {
          const data = await getCompletedRecipes();
          console.log("서버에서 받아온 완성 레시피 데이터:", data);
          setCompletedRecipes(data);
        } else {
          // 로그인 안 된 경우 로그인 페이지로 이동
          navigate("/login");
        }

        setLoading(false);
      } catch (error) {
        console.error("완성 레시피 불러오는 중 오류 발생:", error);
        setLoading(false);
      }
    };

    fetchCompletedRecipes();
  }, [navigate]);

  // 레시피 클릭 핸들러
  const handleRecipeClick = (recipe) => {
    console.log("레시피 클릭:", recipe);
    // 필요한 경우 레시피 상세 페이지로 이동 또는 다른 액션 추가
  };

  // 네비게이션 핸들러
  const handleBack = () => navigate(-1);
  const handleClose = () => navigate("/card");

  // 커스텀 헤더 스타일 정의
  const customHeaderStyle = {
    fontFamily: "'Kablammo', cursive",
    fontSize: "24px",
  };

  return (
    <div className="game-storage-page-container">
      <GameBackground />
      <Header
        leftIcon={backArrow}
        title="Foody Cat"
        rightIcon={close}
        onLeftClick={handleBack}
        onRightClick={handleClose}
        titleStyle={customHeaderStyle} // 커스텀 스타일 전달
      />
      <div className="game-storage-page-content">
        <h2 className="game-storage-title pixel-font-kr">나의 레시피 보관함</h2>

        {loading ? (
          <div className="loading pixel-font-kr">레시피를 불러오는 중...</div>
        ) : (
          <GameStorageList
            completedRecipes={completedRecipes}
            onRecipeClick={handleRecipeClick}
          />
        )}
      </div>
    </div>
  );
};

export default GameStoragePage;
