import { useRef, useState } from "react";
import "./RecommendSection.css";

const RecommendSection = ({ title, items }) => {
  const scrollRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 터치 시작 또는 마우스 다운 이벤트 핸들러
  const handleStart = (clientX) => {
    setIsScrolling(true);
    setStartX(clientX);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  // 마우스 다운 이벤트
  const handleMouseDown = (e) => {
    handleStart(e.clientX);
  };

  // 터치 시작 이벤트
  const handleTouchStart = (e) => {
    handleStart(e.touches[0].clientX);
  };

  // 이동 중 핸들러
  const handleMove = (clientX) => {
    if (!isScrolling) return;
    const x = clientX;
    const distance = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - distance;
  };

  // 마우스 이동 이벤트
  const handleMouseMove = (e) => {
    e.preventDefault();
    handleMove(e.clientX);
  };

  // 터치 이동 이벤트
  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  // 스크롤 종료 핸들러
  const handleEnd = () => {
    setIsScrolling(false);
  };

  return (
    <div className="recommend-section-container">
      <div className="recommend-title bold">{title}</div>
      <div
        className="recommend-slide"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={isScrolling ? handleMouseMove : null}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={isScrolling ? handleTouchMove : null}
        onTouchEnd={handleEnd}
      >
        {items.map((item) => (
          <div key={item.id} className="recommend-item-container">
            <img
              src={item.image}
              alt={item.name}
              className="recommend-item-img"
            />
            <p className="recommend-item-description">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RecommendSection;
