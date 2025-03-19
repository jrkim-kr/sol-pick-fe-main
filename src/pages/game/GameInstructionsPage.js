import React from "react";
import { useNavigate } from "react-router-dom";
import "./GameInstructionsPage.css";

// 컴포넌트 및 배경 임포트
import GameBackground from "../../components/game/GameBackground";
import GameInstructions from "../../components/game/GameInstructions";
import Header from "../../components/common/header/Header";

// 필요한 아이콘 import
import backArrow from "../../assets/backArrow.svg";
import close from "../../assets/close.svg";

/**
 * 게임 설명 페이지
 * 게임 방법과 보상 체계를 설명하는 페이지 컴포넌트
 */
const GameInstructionsPage = () => {
  const navigate = useNavigate();

  // 네비게이션 핸들러
  const handleGoBack = () => navigate("/game/home");
  const handleClose = () => navigate("/card");

  // 게임 시작 핸들러
  const handleStartGame = () => {
    navigate("/game/daily-game");
  };

  // 커스텀 헤더 스타일 정의
  const customHeaderStyle = {
    fontFamily: "'Kablammo', cursive",
    // 필요한 경우 추가 스타일 속성 지정
    fontSize: "24px",
  };

  return (
    <div className="game-instructions-page-container">
      <Header
        leftIcon={backArrow}
        title="Foody Cat"
        rightIcon={close}
        onLeftClick={handleGoBack}
        onRightClick={handleClose}
        titleStyle={customHeaderStyle} // 커스텀 스타일 전달
      />

      <div className="game-instructions-component-container">
        <GameBackground />
        <div className="scrollable-content">
          <GameInstructions onStartGame={handleStartGame} />
        </div>
      </div>
    </div>
  );
};

export default GameInstructionsPage;
