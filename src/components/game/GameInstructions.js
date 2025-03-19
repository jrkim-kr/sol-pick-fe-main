import React from "react";
import "./GameInstructions.css";
import rainbowCat from "../../assets/game/rainbowCat.svg";

/**
 * 게임 설명 컴포넌트 - 게임 방법과 보상 체계를 설명합니다.
 * @param {Object} props - 컴포넌트 속성
 * @param {Function} props.onStartGame - 게임 시작 버튼 클릭 핸들러
 * @param {Function} props.onBack - 뒤로가기 버튼 클릭 핸들러
 * @returns {JSX.Element} 게임 설명 컴포넌트
 */
const GameInstructions = ({ onStartGame }) => {
  return (
    <div className="game-instructions-container">
      <h1 className="daily-game-title pixel-font-kr">
        냥이를 위한 레시피 카드 게임 🎮
      </h1>

      <div className="cat-image-container">
        <img src={rainbowCat} alt="Rainbow Cat" className="rainbow-cat" />
      </div>

      <div className="game-description">
        <h3 className="pixel-font-kr">게임 방법</h3>

        <p className="pixel-font-kr">카드를 클릭하여 뒤집으세요.</p>

        <p className="pixel-font-kr">
          같은 레시피 재료 카드 두 장을 찾아 짝을 맞추세요.
        </p>

        <p className="pixel-font-kr">
          모든 카드의 짝을 맞추면 레벨이 완료됩니다!
        </p>

        <p className="pixel-font-kr">
          총 5단계의 레벨이 있으며, 레벨이 올라갈수록 카드 수가 늘어납니다.
        </p>

        <p className="pixel-font-kr">
          각 레벨 클리어 시 해당 레벨 번호만큼의 사료를 획득합니다.
        </p>

        <div className="reward-table pixel-font-kr">
          레벨 1 성공: 사료 x 1<br />
          레벨 2 성공: 사료 x 2<br />
          레벨 3 성공: 사료 x 3<br />
          레벨 4 성공: 사료 x 4<br />
          레벨 5 성공: 사료 x 5
        </div>

        <p className="pixel-font-kr">
          사료 보상은 누적됩니다. 모든 레벨을 클리어하면 최대 15개의 사료를 얻을
          수 있습니다!
        </p>
      </div>

      <div className="game-instructions-buttons">
        <button
          className="daily-game-start-button pixel-font-kr"
          onClick={onStartGame}
        >
          게임 시작하기
        </button>
      </div>
    </div>
  );
};

export default GameInstructions;
