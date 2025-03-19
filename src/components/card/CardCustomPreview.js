import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import "./CardCustomPreview.css";
import { stickers } from "./StickerData";

const CardCustomPreview = forwardRef((props, ref) => {
  const {
    selectedStickers,
    onStickerUpdate,
    onStickerRemove,
    selectedStickerId,
    isDraggingFromPalette,
    draggedStickerTypeId,
    generateId,
    backgroundImage, // 배경 이미지 prop 추가
  } = props;

  const [draggingStickerId, setDraggingStickerId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDropZoneActive, setIsDropZoneActive] = useState(false);
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);

  // 부모 컴포넌트에서 참조할 메소드 노출
  useImperativeHandle(ref, () => ({
    getCardElement: () => cardRef.current,
  }));

  // 카드에 스티커 추가하는 함수
  const addStickerToCard = (stickerTypeId, x, y) => {
    const stickerType = stickers.find((s) => s.id === stickerTypeId);
    if (!stickerType) return;

    // 새 스티커 생성 및 추가
    const newSticker = {
      id: generateId(),
      typeId: stickerType.id,
      position: { x, y },
    };

    onStickerUpdate([...selectedStickers, newSticker]);
  };

  // 카드 클릭 시 스티커 추가
  const handleCardClick = (e) => {
    if (!selectedStickerId) return;

    // 카드 내부의 상대적 위치 계산
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    addStickerToCard(selectedStickerId, x, y);
  };

  // 스티커 터치/마우스 다운 이벤트 시작
  const handleStickerMouseDown = (e, stickerId) => {
    e.stopPropagation();

    // 시작 위치 저장 (나중에 클릭과 드래그를 구분하기 위해)
    setStartDragPosition({
      x: e.clientX || e.touches[0].clientX,
      y: e.clientY || e.touches[0].clientY,
    });

    // 드래그 시작 준비
    setDraggingStickerId(stickerId);
    setIsDragging(false);

    // 현재 스티커의 위치 찾기
    const stickerElement = e.currentTarget;
    const stickerRect = stickerElement.getBoundingClientRect();

    // 스티커 내부의 클릭 위치 계산 (드래그 오프셋)
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    setDragOffset({
      x: clientX - stickerRect.left,
      y: clientY - stickerRect.top,
    });
  };

  // 스티커 드래그 중
  const handleMouseMove = (e) => {
    if (!draggingStickerId) return;

    // 드래그 중임을 표시
    setIsDragging(true);

    // 카드 내부의 상대적 위치 계산
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    const x = clientX - rect.left - dragOffset.x;
    const y = clientY - rect.top - dragOffset.y;

    // 카드 경계 내에서만 이동 가능하도록 제한
    const maxX = rect.width - 40; // 스티커 너비 고려
    const maxY = rect.height - 40; // 스티커 높이 고려

    const boundedX = Math.max(0, Math.min(maxX, x));
    const boundedY = Math.max(0, Math.min(maxY, y));

    // 현재 드래그 중인 스티커의 위치 업데이트
    const updatedStickers = selectedStickers.map((sticker) => {
      if (sticker.id === draggingStickerId) {
        return { ...sticker, position: { x: boundedX, y: boundedY } };
      }
      return sticker;
    });

    onStickerUpdate(updatedStickers);
  };

  // 스티커 드래그 종료
  const handleMouseUp = (e) => {
    if (!draggingStickerId) return;

    // 드래그 종료 후, 움직임이 없었다면 (클릭으로 간주)
    if (!isDragging) {
      // 스티커 삭제
      onStickerRemove(draggingStickerId);
    }

    // 상태 초기화
    setDraggingStickerId(null);
    setIsDragging(false);
  };

  // 드롭 영역 이벤트 핸들러
  const handleDragOver = (e) => {
    e.preventDefault(); // 드롭을 허용하기 위해 기본 동작 방지
    setIsDropZoneActive(true);
  };

  const handleDragLeave = () => {
    setIsDropZoneActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDropZoneActive(false);

    if (!draggedStickerTypeId) return;

    // 카드 내부의 드롭 위치 계산
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 새 스티커 추가
    addStickerToCard(draggedStickerTypeId, x, y);
  };

  // 컴포넌트가 언마운트될 때 이벤트 리스너 정리
  useEffect(() => {
    if (draggingStickerId) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleMouseMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [draggingStickerId, selectedStickers]);

  return (
    <div className="card-custom-preview-container">
      <div className="card-custom-preview">
        <div className="preview-instruction">
          💡 스티커 한 번 더 클릭하면 스티커가 삭제돼요
        </div>
        <div
          className={`card-background ${
            isDropZoneActive ? "drop-zone-active" : ""
          }`}
          ref={cardRef}
          onClick={handleCardClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* 기존 SVG 코드를 제거하고 import한 SVG 이미지로 교체 */}
          <img
            src={backgroundImage}
            alt="Card Background"
            width="100%"
            height="100%"
          />

          {/* 선택된 모든 스티커 표시 */}
          {selectedStickers.map((sticker) => {
            const stickerType = stickers.find((s) => s.id === sticker.typeId);
            return (
              <div
                key={sticker.id}
                className="placed-sticker"
                style={{
                  left: `${sticker.position.x}px`,
                  top: `${sticker.position.y}px`,
                  position: "absolute",
                  cursor: "pointer",
                  zIndex: draggingStickerId === sticker.id ? 10 : 1,
                }}
                onMouseDown={(e) => handleStickerMouseDown(e, sticker.id)}
                onTouchStart={(e) => handleStickerMouseDown(e, sticker.id)}
                onClick={(e) => e.stopPropagation()}
              >
                {stickerType.icon}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

CardCustomPreview.displayName = "CardCustomPreview";

export default CardCustomPreview;
