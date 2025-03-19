import React from "react";
import "./GameStorage.css";
import rainbowCat from "../../assets/game/rainbowCat.svg";

const GameStorage = ({ onNext }) => {
  return (
    <div className="game-storage-container">
      <div className="game-storage-content">
        <div className="cat-image-container">
          <img src={rainbowCat} alt="Rainbow Cat" className="rainbow-cat" />
        </div>
        <div className="game-storage-text">
          <p className="pixel-font-kr">냥냥! 고양이가 쑥쑥 크면,</p>
          <p className="pixel-font-kr">레시피만큼 포인트를 받을 수 있다냥!</p>
        </div>
        <button className="start-button" onClick={onNext}>
          확인했다냥
        </button>
      </div>
    </div>
  );
};

export default GameStorage;
