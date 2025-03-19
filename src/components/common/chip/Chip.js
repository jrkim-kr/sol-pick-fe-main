import React, { useState } from "react";
import "./Chip.css";

const Chip = ({ items, initialSelected = 0, onSelect = () => {} }) => {
  const [selectedIndex, setSelectedIndex] = useState(initialSelected);

  const handleChipClick = (index) => {
    setSelectedIndex(index);
    onSelect(index); // 부모 컴포넌트가 없으면 빈 함수 실행 (에러 방지)
  };

  return (
    <div className="chip-container">
      <div className="chip">
        {items.map((item, index) => (
          <button
            key={index}
            className={`chip-item ${selectedIndex === index ? "selected" : ""}`}
            onClick={() => handleChipClick(index)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chip;
