import React from "react";
import { useNavigate } from "react-router-dom";
import "./GameMainPage.css";

// 카드 디자인 컴포넌트
import GameMain from "../../components/game/GameMain";

// 필요한 아이콘 import
import backArrow from "../../assets/backArrow.svg";
import close from "../../assets/close.svg";

// 헤더 및 푸터 관련 컴포넌트
import Header from "../../components/common/header/Header";

const GameMainPage = () => {
  const navigate = useNavigate();

  // 네비게이션 핸들러
  const handleBack = () => navigate("/game/intro");
  const handleClose = () => navigate("/card");

  // 게임 관련 페이지 이동 핸들러
  const handleDailyGameClick = () => {
    navigate("/game/instructions");
  };

  const handleStorageClick = () => {
    navigate("/game/storage"); // 추후 구현
  };

  // 커스텀 헤더 스타일 정의
  const customHeaderStyle = {
    fontFamily: "'Kablammo', cursive",
    // 필요한 경우 추가 스타일 속성 지정
    fontSize: "24px",
  };

  return (
    <div className="game-main-page-container">
      <Header
        leftIcon={backArrow}
        title="Foody Cat"
        rightIcon={close}
        onLeftClick={handleBack}
        onRightClick={handleClose}
        titleStyle={customHeaderStyle} // 커스텀 스타일 전달
      />

      <div className="game-main-component-container">
        <GameMain
          onDailyGame={handleDailyGameClick}
          onStorage={handleStorageClick}
        />
      </div>
    </div>
  );
};

export default GameMainPage;
