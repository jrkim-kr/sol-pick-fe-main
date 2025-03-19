import React, { useState, useRef, useEffect } from "react";
import "./CardCustomSticker.css";
import CardCustomPreview from "./CardCustomPreview";
import { stickers } from "./StickerData";
import { saveCardStickers } from "../../api/CardApi";
import { useToast } from "../../context/ToastContext"; // Toast Context 불러오기

// 카드 배경 이미지 import
import CardBackground1 from "../../assets/card/basicDesign.svg";
import CardBackground2 from "../../assets/card/cardBackground2.svg";
import CardBackground3 from "../../assets/card/cardBackground3.svg";
import CardBackground4 from "../../assets/card/cardBackground4.svg";
import CardBackground5 from "../../assets/card/cardBackground5.svg";

const CardCustomSticker = ({ onNext }) => {
  const { showToast } = useToast(); // Toast 함수 가져오기
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStickerId, setSelectedStickerId] = useState(null);
  const [placedStickers, setPlacedStickers] = useState([]);
  const [isDraggingFromPalette, setIsDraggingFromPalette] = useState(false);
  const [draggedStickerTypeId, setDraggedStickerTypeId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const cardPreviewRef = useRef(null);

  // 카드 배경 매핑 객체
  const cardBackgrounds = {
    1: CardBackground1,
    2: CardBackground2,
    3: CardBackground3,
    4: CardBackground4,
    5: CardBackground5,
  };

  // 컴포넌트 마운트 시 로컬 스토리지에서 배경 ID 가져오기
  useEffect(() => {
    const designId = localStorage.getItem("cardDesignId");
    const backgroundId = localStorage.getItem("backgroundId");

    console.log("로컬 스토리지 값:", {
      designId: localStorage.getItem("cardDesignId"),
      backgroundId: localStorage.getItem("backgroundId"),
    });

    // 배경 ID가 직접 저장되어 있는 경우
    if (backgroundId) {
      console.log(`backgroundId ${backgroundId}로 배경 설정`);
      setSelectedBackground(cardBackgrounds[backgroundId] || CardBackground1);
    }
    // 디자인 ID를 통해 배경을 추론할 수 있는 경우 (배경 ID가 1부터 5까지 범위)
    else if (designId && designId >= 1 && designId <= 5) {
      console.log(`designId ${designId}로 배경 추론`);
      setSelectedBackground(cardBackgrounds[designId] || CardBackground1);
    }
    // 기본 배경으로 설정
    else {
      console.log("기본 배경으로 설정");
      setSelectedBackground(CardBackground1);
    }
  }, []);

  // 페이지 변경 핸들러
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  // 스티커 종류 선택 핸들러
  const handleStickerSelect = (stickerId) => {
    setSelectedStickerId(stickerId);
  };

  // 스티커 업데이트 핸들러 (배치 또는 위치 변경)
  const handleStickerUpdate = (updatedStickers) => {
    setPlacedStickers(updatedStickers);
  };

  // 스티커 삭제 핸들러
  const handleStickerRemove = (stickerId) => {
    setPlacedStickers(
      placedStickers.filter((sticker) => sticker.id !== stickerId)
    );
  };

  // 팔레트에서 스티커 드래그 시작 핸들러
  const handlePaletteStickerDragStart = (e, stickerId) => {
    setIsDraggingFromPalette(true);
    setDraggedStickerTypeId(stickerId);

    // 드래그 이미지 설정 (브라우저마다 다르게 표시될 수 있음)
    if (e.dataTransfer && e.target) {
      e.dataTransfer.setData("text/plain", stickerId);

      // 드래그 이미지 설정을 위한 투명 엘리먼트 생성
      const dragImage = document.createElement("div");
      dragImage.style.width = "40px";
      dragImage.style.height = "40px";
      dragImage.style.background = "transparent";
      document.body.appendChild(dragImage);

      e.dataTransfer.setDragImage(dragImage, 20, 20);

      // 잠시 후 투명 엘리먼트 제거
      setTimeout(() => {
        document.body.removeChild(dragImage);
      }, 0);
    }

    // 드래그 중인 스티커 스타일 적용
    if (e.target) {
      e.target.classList.add("dragging");
    }
  };

  // 드래그 종료 핸들러
  const handlePaletteStickerDragEnd = (e) => {
    setIsDraggingFromPalette(false);
    setDraggedStickerTypeId(null);

    // 드래그 중 스타일 제거
    if (e.target) {
      e.target.classList.remove("dragging");
    }
  };

  // 고유 ID 생성 함수
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  };

  // 한 페이지당 15개의 스티커 표시 (3행 x 5열)
  const stickersPerPage = 15;
  const startIndex = currentPage * stickersPerPage;
  const pageStickers = stickers.slice(startIndex, startIndex + stickersPerPage);

  // 스티커 정보 저장 함수
  const handleStickerSave = async () => {
    try {
      setIsLoading(true);
      const designId = localStorage.getItem("cardDesignId");

      // 스티커 데이터 포맷팅
      const stickersData = placedStickers.map((sticker) => ({
        id: sticker.id,
        typeId: sticker.typeId,
        position: sticker.position,
      }));

      // API 호출 방식은 유지하고 데이터 처리 부분만 수정
      await saveCardStickers.post("/solpick/api/card-design/save-stickers", {
        designId: parseInt(designId),
        stickersData: JSON.stringify(stickersData),
      });

      // 다음 페이지로 이동
      onNext();
    } catch (error) {
      console.error("스티커 저장 실패:", error);
      showToast("스티커 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-custom-sticker-container">
      <div className="card-custom-sticker-content">
        <div className="card-sticker-title">
          <h2>원하는 스티커를 카드에 붙여주세요</h2>
        </div>
        <div className="card-sticker-underline"></div>

        {/* 카드 미리보기 */}
        <CardCustomPreview
          ref={cardPreviewRef}
          selectedStickers={placedStickers}
          onStickerUpdate={handleStickerUpdate}
          onStickerRemove={handleStickerRemove}
          selectedStickerId={selectedStickerId}
          isDraggingFromPalette={isDraggingFromPalette}
          draggedStickerTypeId={draggedStickerTypeId}
          generateId={generateId}
          backgroundImage={selectedBackground} // 배경 이미지 전달
        />

        {/* 스티커 선택 영역 */}
        <div className="sticker-grid-container">
          <div className="sticker-grid">
            {pageStickers.map((sticker) => (
              <div
                key={sticker.id}
                className={`sticker-item ${
                  selectedStickerId === sticker.id ? "selected" : ""
                }`}
                onClick={() => handleStickerSelect(sticker.id)}
                draggable="true"
                onDragStart={(e) =>
                  handlePaletteStickerDragStart(e, sticker.id)
                }
                onDragEnd={handlePaletteStickerDragEnd}
              >
                {sticker.icon}
              </div>
            ))}
          </div>
        </div>

        {/* 페이지 인디케이터 */}
        <div className="page-indicator">
          <button
            className={`page-arrow ${currentPage === 0 ? "disabled" : ""}`}
            onClick={() => currentPage > 0 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            &lt;
          </button>
          <div className="page-dots">
            <span
              className={`page-dot ${currentPage === 0 ? "active" : ""}`}
              onClick={() => handlePageChange(0)}
            ></span>
            <span
              className={`page-dot ${currentPage === 1 ? "active" : ""}`}
              onClick={() => handlePageChange(1)}
            ></span>
          </div>
          <button
            className={`page-arrow ${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => currentPage < 1 && handlePageChange(currentPage + 1)}
            disabled={currentPage === 1}
          >
            &gt;
          </button>
        </div>
        <div className="sticker-button-container">
          <button
            className="sticker-selection-button"
            onClick={handleStickerSave}
            disabled={placedStickers.length === 0 || isLoading}
          >
            {isLoading ? "처리 중..." : "다음"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardCustomSticker;
