import React, { useState, useEffect } from "react";
import "./CardCompletion.css";
import { issueCard, getCardInfo } from "../../api/CardApi";
import CardBackground1 from "../../assets/card/basicDesign.svg";
import CardBackground2 from "../../assets/card/cardBackground2.svg";
import CardBackground3 from "../../assets/card/cardBackground3.svg";
import CardBackground4 from "../../assets/card/cardBackground4.svg";
import CardBackground5 from "../../assets/card/cardBackground5.svg";
// 스티커 데이터 import 추가
import { stickers } from "../../components/card/StickerData";

const CardCompletion = ({ onConfirm }) => {
  const [cardInfo, setCardInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const cardBackgrounds = {
    1: CardBackground1,
    2: CardBackground2,
    3: CardBackground3,
    4: CardBackground4,
    5: CardBackground5,
  };

  useEffect(() => {
    const fetchCardInfo = async () => {
      try {
        // 로그인한 사용자 정보 가져오기
        const userInfo = JSON.parse(localStorage.getItem("user"));
        const userId = userInfo?.memberId;

        // 로컬 스토리지에서 다른 필요 데이터 가져오기
        const designId = localStorage.getItem("cardDesignId");
        const lastName = localStorage.getItem("cardLastName");
        const firstName = localStorage.getItem("cardFirstName");

        // 필수 파라미터 확인
        if (!userId || !designId || !lastName || !firstName) {
          console.error("필수 파라미터가 누락되었습니다:", {
            userId,
            designId,
            lastName,
            firstName,
          });
          throw new Error("필수 파라미터가 누락되었습니다.");
        }

        // 카드 발급 API 호출
        await issueCard(parseInt(userId), designId, lastName, firstName);

        // 카드 정보 가져오기
        const response = await getCardInfo(parseInt(userId));
        console.log("서버에서 받아온 카드 정보:", response);

        // API 응답 구조에 따라 적절히 데이터 추출
        setCardInfo(response);
      } catch (error) {
        console.error("카드 정보 로딩 실패:", error);

        // 에러 발생 시 기본 디자인으로 폴백 처리도 가능
        setCardInfo({
          cardNumber: "9411 **** **** 1234",
          expiryDate: "03/28",
          cvcNumber: "123",
          firstName: localStorage.getItem("cardFirstName") || "HONG",
          lastName: localStorage.getItem("cardLastName") || "GILDONG",
          backgroundId: 1,
          stickersData: "[]",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCardInfo();
  }, []); // 빈 종속성 배열

  // 이미지 로드 이벤트를 처리하는 별도의 useEffect
  useEffect(() => {
    if (!cardInfo || loading) return;

    const cardImageElement = document.querySelector(".card-background-image");
    if (!cardImageElement) return;

    const adjustStickersPosition = () => {
      // 스티커 위치만 조정하는 로직 (상태 업데이트 없이)
      const stickersContainer = document.querySelector(
        ".completion-card-preview"
      );
      if (stickersContainer) {
        // DOM 요소 직접 조작하여 스티커 위치 조정
      }
    };

    if (cardImageElement.complete) {
      adjustStickersPosition();
    } else {
      cardImageElement.addEventListener("load", adjustStickersPosition);
      return () => {
        cardImageElement.removeEventListener("load", adjustStickersPosition);
      };
    }
  }, [cardInfo, loading]);

  // 스티커 데이터에서 typeId에 맞는 스티커 찾기
  const findStickerById = (typeId) => {
    return stickers.find((sticker) => sticker.id === typeId) || null;
  };

  // 스티커를 렌더링하는 함수
  const renderStickers = () => {
    if (!cardInfo || !cardInfo.stickersData) return null;

    try {
      const stickersArray =
        typeof cardInfo.stickersData === "string"
          ? JSON.parse(cardInfo.stickersData)
          : cardInfo.stickersData;

      console.log("파싱된 스티커 데이터:", stickersArray);

      // 카드 이미지의 실제 크기를 가져오기 위한 참조
      const cardImageElement = document.querySelector(".card-background-image");
      const cardWidth = cardImageElement ? cardImageElement.clientWidth : 343; // 기본값: 일반적인 카드 너비
      const cardHeight = cardImageElement ? cardImageElement.clientHeight : 215; // 기본값: 일반적인 카드 높이

      // 디자인 페이지와 완료 페이지의 카드 크기 비율 계산
      // 디자인 페이지에서 스티커 위치가 결정된 원본 카드 크기 (예: 343x215)
      const originalCardWidth = 343;
      const originalCardHeight = 215;

      // 스케일 비율 계산
      const scaleX = cardWidth / originalCardWidth;
      const scaleY = cardHeight / originalCardHeight;

      return stickersArray.map((stickerData, index) => {
        const stickerInfo = findStickerById(stickerData.typeId);

        // 위치 조정 (비율에 맞게 조정)
        const adjustedX = stickerData.position.x * scaleX;
        const adjustedY = stickerData.position.y * scaleY;

        return (
          <div
            key={stickerData.id || `sticker-${index}`}
            className="placed-sticker"
            style={{
              position: "absolute",
              left: `${adjustedX}px`,
              top: `${adjustedY}px`,
              zIndex: 2,
              // 스티커 크기 조정 (SVG는 원본 비율 유지)
              transform: "scale(0.8)", // 스티커 크기를 좀 더 크게
              transformOrigin: "center center", // 변환 중심점
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

  if (loading) {
    return <div>카드 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className="card-completion-container">
      <div className="card-completion-content">
        {/* 체크 아이콘 */}
        <div className="check-icon-container">
          <svg className="check-icon" viewBox="0 0 24 24">
            <path
              d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="card-completion-title">
          <h2>신한카드 쏠픽(SOL Pick)</h2>
          <h2>신청완료!</h2>
        </div>

        {/* 카드 배경 이미지 */}
        {cardInfo && (
          <div className="completion-card-preview">
            <div className="card-image">
              <img
                src={cardBackgrounds[cardInfo.backgroundId]}
                alt="카드 배경"
                className="card-background-image"
              />

              {/* 카드 정보 표시 */}
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
                    <div className="card-expiry-value">
                      {cardInfo.expiryDate}
                    </div>
                  </div>
                  <div className="card-info-column">
                    <div className="card-info-label">CVC</div>
                    <div className="card-cvc-value">{cardInfo.cvcNumber}</div>
                  </div>
                </div>
              </div>

              {/* 스티커 렌더링 */}
              {renderStickers()}
            </div>
          </div>
        )}

        <button className="completion confirm-button" onClick={onConfirm}>
          확인
        </button>
      </div>
    </div>
  );
};

export default CardCompletion;
