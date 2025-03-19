import React, { useState, useRef } from "react";
import "./CardDesignSelection.css";
import BasicDesignFront from "../../assets/card/basicDesign.svg";
import BasicDesignBack from "../../assets/card/basicDesignBack.svg";
import CustomBasicDesign from "../../assets/card/customBasicDesign.svg";
import { saveCardBackground } from "../../api/CardApi";
import { useToast } from "../../context/ToastContext"; // Toast Context 불러오기

// 카드 디자인 타입 상수
const CARD_VIEWS = {
  FRONT_BASIC: "frontBasic",
  BACK_BASIC: "backBasic",
  FRONT_CUSTOM: "frontCustom",
};

const CardDesign = ({ onNext, onCustomize }) => {
  const cardRef = useRef(null);
  const showToast = useToast();

  // 상태 관리
  const [cardView, setCardView] = useState(CARD_VIEWS.FRONT_BASIC);
  const [isFlipping, setIsFlipping] = useState(false);

  // 카드 화면 전환 핸들러
  const handleSwitchDesign = () => {
    if (cardView === CARD_VIEWS.FRONT_BASIC) {
      setCardView(CARD_VIEWS.FRONT_CUSTOM);
    } else if (cardView === CARD_VIEWS.FRONT_CUSTOM) {
      setCardView(CARD_VIEWS.FRONT_BASIC);
    }
  };

  // 카드 뒤집기 핸들러
  const handleFlipCard = () => {
    if (isFlipping) return; // 이미 뒤집는 중이면 무시

    setIsFlipping(true);

    // 카드 뒤집기 애니메이션 적용
    if (cardRef.current) {
      cardRef.current.classList.add("flipping");
    }

    // 애니메이션 중간에 카드 면 변경
    setTimeout(() => {
      setCardView((prevView) =>
        prevView === CARD_VIEWS.FRONT_BASIC
          ? CARD_VIEWS.BACK_BASIC
          : CARD_VIEWS.FRONT_BASIC
      );
    }, 150); // 애니메이션 중간 지점

    // 애니메이션 완료 후 상태 초기화
    setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.classList.remove("flipping");
      }
      setIsFlipping(false);
    }, 300); // 애니메이션 완료 시점
  };

  // 카드 디자인 라벨 텍스트 결정
  const getDesignLabelText = () => {
    switch (cardView) {
      case CARD_VIEWS.FRONT_BASIC:
        return "기본 디자인";
      case CARD_VIEWS.BACK_BASIC:
        return "기본 디자인 (뒷면)";
      case CARD_VIEWS.FRONT_CUSTOM:
        return "나만의 카드 직접 꾸며 보세요";
      default:
        return "";
    }
  };

  // 디자인 선택 버튼 렌더링
  const renderDesignButton = () => {
    if (cardView === CARD_VIEWS.FRONT_BASIC) {
      return (
        <button className="design-button" onClick={handleFlipCard}>
          뒷면 보기
        </button>
      );
    } else if (cardView === CARD_VIEWS.BACK_BASIC) {
      return (
        <button className="design-button" onClick={handleFlipCard}>
          앞면 보기
        </button>
      );
    } else if (cardView === CARD_VIEWS.FRONT_CUSTOM) {
      return (
        <button
          className="design-button custom-design-button"
          onClick={onCustomize}
        >
          꾸미러 가기 ✨
        </button>
      );
    }
  };

  // 카드 이미지 렌더링
  const renderCardImage = () => {
    switch (cardView) {
      case CARD_VIEWS.FRONT_BASIC:
        return (
          <img
            src={BasicDesignFront}
            alt="카드 기본 디자인 앞면"
            className="basic-card-image"
          />
        );
      case CARD_VIEWS.BACK_BASIC:
        return (
          <img
            src={BasicDesignBack}
            alt="카드 기본 디자인 뒷면"
            className="basic-card-image"
          />
        );
      case CARD_VIEWS.FRONT_CUSTOM:
        return (
          <div className="custom-card-placeholder custom-card-image">
            <img
              src={CustomBasicDesign}
              alt="커스텀 카드 기본 디자인"
              className="custom-basic-card-image"
            />
          </div>
        );
      default:
        return null;
    }
  };

  // 기본 디자인 선택 시
  const handleBasicDesignSelect = async () => {
    try {
      const userId = localStorage.getItem("userId");

      // 기본 디자인(배경 ID 1)을 저장
      const response = await saveCardBackground.post(
        "/solpick/api/card-design/save-background",
        {
          userId: parseInt(userId),
          backgroundId: 1, // 기본 디자인 ID
        }
      );

      // 디자인 ID 저장
      localStorage.setItem("cardDesignId", response.designId);
      onNext();
    } catch (error) {
      console.error("기본 디자인 저장 실패:", error);
      // showToast("디자인 저장에 실패했습니다.");
    }
  };

  return (
    <div className="card-design-selection-container">
      <div className="card-design-selection-content">
        {/* 진행 단계 표시 */}
        <div className="step-indicator">
          <div className="active"></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <p className="step-number">1 / 6</p>

        {/* 안내 텍스트 */}
        <div className="card-design-title">
          <h2>카드 디자인을 선택해 주세요</h2>
        </div>

        {/* 카드 디자인 표시 영역 */}
        <div className="card-preview">
          {/* 카드 이미지 */}
          <div ref={cardRef} className={`select-card-image ${cardView}`}>
            {renderCardImage()}

            {/* 화살표 버튼 렌더링 */}
            {cardView === CARD_VIEWS.FRONT_BASIC && (
              <div
                className="card-arrow card-next-arrow"
                onClick={handleSwitchDesign}
              >
                &#62;
              </div>
            )}

            {cardView === CARD_VIEWS.FRONT_CUSTOM && (
              <div
                className="card-arrow card-prev-arrow"
                onClick={handleSwitchDesign}
              >
                &#60;
              </div>
            )}
          </div>

          {/* 디자인 선택 영역 */}
          <div className="design-selection">
            <p className="design-label">{getDesignLabelText()}</p>
            {renderDesignButton()}
          </div>
        </div>

        {/* 다음 버튼 */}
        <div className="design-button-container">
          {cardView === CARD_VIEWS.FRONT_BASIC ? (
            <button
              className="design next-button"
              onClick={handleBasicDesignSelect}
            >
              선택
            </button>
          ) : (
            <div className="blank-container"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardDesign;
