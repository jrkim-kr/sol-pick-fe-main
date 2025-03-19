import React, { useRef } from "react";
import "./SelectS.css";
import selectArrow from "../../../assets/selectArrow.svg";
import selectArrowActive from "../../../assets/selectArrowActive.svg";

const SelectS = ({
  name,
  id,
  options = [],
  defaultValue = "",
  onChange,
  width = "76px",
  height = "28px",
  className,
}) => {
  const selectRef = useRef(null);

  // 옵션 선택 후 포커스 제거
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }

    selectRef.current.blur();
  };

  return (
    <div className="selectS-container">
      <select
        ref={selectRef}
        name={name}
        id={id}
        onChange={handleChange}
        defaultValue={defaultValue}
        className={`selectS ${className || ""}`}
        style={{ width, height }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <img
        src={selectArrow}
        alt="Select Arrow"
        className="selectSArrow-icon default"
      />
      <img
        src={selectArrowActive}
        alt="Select Arrow Active"
        className="selectSArrow-icon active"
      />
    </div>
  );
};

export default SelectS;
