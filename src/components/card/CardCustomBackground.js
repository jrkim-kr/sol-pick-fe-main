import React, { useState } from "react";
import "./CardCustomBackground.css";
import CardBackground2 from "../../assets/card/cardBackground2.svg";
import CardBackground3 from "../../assets/card/cardBackground3.svg";
import CardBackground4 from "../../assets/card/cardBackground4.svg";
import CardBackground5 from "../../assets/card/cardBackground5.svg";
import { saveCardBackground } from "../../api/CardApi";
import { useToast } from "../../context/ToastContext"; // Toast Context 불러오기

const CardCustomBackground = ({ onNext }) => {
  const { showToast } = useToast(); // Toast 함수 가져오기

  // 카드 디자인 옵션 데이터 - SVG 배경으로 변경
  const cardDesigns = [
    { id: 2, name: "디자인 2", backgroundImage: CardBackground2 },
    { id: 3, name: "디자인 3", backgroundImage: CardBackground3 },
    { id: 4, name: "디자인 4", backgroundImage: CardBackground4 },
    { id: 5, name: "디자인 5", backgroundImage: CardBackground5 },
  ];

  // 선택된 카드 디자인 상태 관리
  const [selectedDesign, setSelectedDesign] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // 선택된 배경 저장 함수
  const handleBackgroundSelection = async () => {
    try {
      setIsLoading(true);
      const userId = localStorage.getItem("userId");

      // API 호출 - 같은 post 메서드와 URL 유지
      const response = await saveCardBackground.post(
        "/solpick/api/card-design/save-background",
        {
          userId: parseInt(userId),
          backgroundId: selectedDesign,
        }
      );

      // 디자인 ID 저장
      localStorage.setItem("cardDesignId", response.designId);
      // 배경 ID 저장
      localStorage.setItem("backgroundId", selectedDesign.toString());

      // 다음 페이지로 이동
      onNext();
    } catch (error) {
      console.error("배경 저장 실패:", error);
      // Alert를 Toast 메시지로 변경
      showToast("배경 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-custom-background-container">
      <div className="card-custom-background-content">
        <div className="card-background-title">
          <h2>카드 배경 선택해 주세요</h2>
        </div>
        <div className="card-background-underline"></div>

        <div className="card-bg-selection-section">
          <div className="card-bg-grid">
            {cardDesigns.map((design) => (
              <div
                key={design.id}
                className={`card-bg-option ${
                  selectedDesign === design.id ? "selected" : ""
                }`}
                onClick={() => setSelectedDesign(design.id)}
              >
                <div
                  className="bg-card-preview"
                  style={{
                    backgroundImage: `url(${design.backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <div className="background-button-cotainer">
          <button
            className="background-selection-button"
            onClick={handleBackgroundSelection}
            disabled={!selectedDesign || isLoading}
          >
            {isLoading ? "처리 중..." : "선택"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardCustomBackground;
