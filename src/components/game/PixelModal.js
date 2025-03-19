import React from "react";
import "./PixelModal.css";

/**
 * 픽셀 아트 스타일의 게임 모달 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {boolean} props.isOpen - 모달 표시 여부
 * @param {string} props.title - 모달 제목
 * @param {string} props.message - 모달 메시지
 * @param {Array} props.buttons - 버튼 배열 [{text: 'OK', onClick: () => {}, type: 'primary'}, ...]
 * @param {Function} props.onClose - 모달 닫기 함수
 * @returns {JSX.Element} 모달 컴포넌트
 */
const PixelModal = ({ isOpen, title, message, buttons = [], onClose }) => {
  if (!isOpen) return null;

  const handleModalClick = (e) => {
    // 모달 내부 클릭 이벤트 버블링 막기
    e.stopPropagation();
  };

  // 버튼 타입에 따른 클래스 지정
  const getButtonClass = (type) => {
    switch (type) {
      case "primary":
        return "pixel-modal-button primary";
      case "secondary":
        return "pixel-modal-button secondary";
      case "danger":
        return "pixel-modal-button danger";
      default:
        return "pixel-modal-button";
    }
  };

  return (
    <div className="pixel-modal-overlay" onClick={onClose}>
      <div className="pixel-modal-container" onClick={handleModalClick}>
        {title && <h2 className="pixel-modal-title pixel-font-kr">{title}</h2>}
        <div className="pixel-modal-content">
          <p className="pixel-modal-message pixel-font-kr">{message}</p>
        </div>
        <div className="pixel-modal-buttons">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`${getButtonClass(button.type)} pixel-font-kr`}
              onClick={button.onClick}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PixelModal;
