import React, { useState, useEffect } from "react";
import "./CardInfo.css";
import CardBackground1 from "../../assets/card/basicDesign.svg";
import CardBackground2 from "../../assets/card/cardBackground2.svg";
import CardBackground3 from "../../assets/card/cardBackground3.svg";
import CardBackground4 from "../../assets/card/cardBackground4.svg";
import CardBackground5 from "../../assets/card/cardBackground5.svg";
import { stickers } from "../../components/card/StickerData";

const CardInfo = ({ cardInfo }) => {
  if (!cardInfo) {
    return <div className="card-loading">카드 정보를 불러오는 중...</div>;
  }

  const cardBackgrounds = {
    1: CardBackground1,
    2: CardBackground2,
    3: CardBackground3,
    4: CardBackground4,
    5: CardBackground5,
  };

  // 스티커 데이터에서 typeId에 맞는 스티커 찾기
  const findStickerById = (typeId) => {
    return stickers.find((sticker) => sticker.id === typeId) || null;
  };

  // 스티커를 렌더링하는 함수
  const renderStickers = () => {
    if (!cardInfo.stickersData) return null;

    try {
      const stickersArray =
        typeof cardInfo.stickersData === "string"
          ? JSON.parse(cardInfo.stickersData)
          : cardInfo.stickersData;

      if (!stickersArray || stickersArray.length === 0) {
        return null;
      }

      return stickersArray.map((stickerData, index) => {
        const stickerInfo = findStickerById(stickerData.typeId);

        return (
          <div
            key={stickerData.id || `sticker-${index}`}
            className="placed-sticker"
            style={{
              position: "absolute",
              left: `${stickerData.position.x}px`,
              top: `${stickerData.position.y}px`,
              zIndex: 2,
              transform: "scale(0.8)",
              transformOrigin: "center center",
            }}
          >
            {stickerInfo ? (
              <div className="sticker-icon-container">{stickerInfo.icon}</div>
            ) : (
              <span className="sticker-placeholder">🔶</span>
            )}
          </div>
        );
      });
    } catch (error) {
      console.error("스티커 렌더링 오류:", error);
      return null;
    }
  };

  // backgroundId가 없는 경우 기본값 설정
  const backgroundId = cardInfo.backgroundId || 1;
  const backgroundImage = cardBackgrounds[backgroundId] || CardBackground1;

  return (
    <div className="card-info-container">
      <div className="completion-card-preview">
        <div className="card-image">
          <img
            src={backgroundImage}
            alt="카드 배경"
            className="card-background-image"
          />

          <div className="card-info-overlay">
            <div className="card-number">{cardInfo.cardNumber}</div>
            <div className="card-info-row">
              <div className="card-info-column">
                <div className="card-info-label">CARD HOLDER</div>
                <div className="card-owner-name">
                  {cardInfo.firstName} {cardInfo.lastName}
                </div>
              </div>
              <div className="card-info-column">
                <div className="card-info-label">VALID THRU</div>
                <div className="card-expiry-value">{cardInfo.expiryDate}</div>
              </div>
              <div className="card-info-column">
                <div className="card-info-label">CVC</div>
                <div className="card-cvc-value">{cardInfo.cvcNumber}</div>
              </div>
            </div>
          </div>

          {renderStickers()}
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
