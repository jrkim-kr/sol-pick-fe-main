import React, { useState } from "react";
import "./CardCustomDirection.css";

const CardCustomDirection = ({ onNext }) => {
  // 선택된 카드 상태 관리
  const [selectedCard, setSelectedCard] = useState(null);

  // 카드 선택 핸들러
  const handleCardSelect = (cardIndex) => {
    setSelectedCard(cardIndex);
  };

  return (
    <div className="card-custom-direction-container">
      <div className="card-custom-direction-content">
        <div className="card-direction-title">
          <h2>카드 방향 선택해 주세요</h2>
        </div>
        <div className="card-direction-underline"></div>

        <div className="card-options-container">
          {/* 가로형 카드 */}
          <div
            className={`card-option ${selectedCard === 0 ? "selected" : ""}`}
            onClick={() => handleCardSelect(0)}
          >
            <div className="direction-card-preview horizontal">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 343 218"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="343"
                  height="218"
                  rx="16"
                  fill="url(#paint0_linear_409_9202)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_409_9202"
                    x1="0"
                    y1="0"
                    x2="343"
                    y2="218"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#BAE8FB" />
                    <stop offset="1" stop-color="#B2B1FD" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* 세로형 카드 */}
          <div
            className={`card-option ${selectedCard === 1 ? "selected" : ""}`}
            onClick={() => handleCardSelect(1)}
          >
            <div className="direction-card-preview vertical">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 218 343"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="218"
                  height="343"
                  rx="16"
                  fill="url(#paint0_linear_409_9202)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_409_9202"
                    x1="0"
                    y1="0"
                    x2="218"
                    y2="343"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#BAE8FB" />
                    <stop offset="1" stop-color="#B2B1FD" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <div className="direction-button-cotainer">
          <button
            className="direction-selection-button"
            onClick={onNext}
            disabled={selectedCard === null}
          >
            선택
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardCustomDirection;
