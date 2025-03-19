import React, { useRef } from "react";
import "./SelectL.css";
import selectArrow from "../../../assets/selectArrow.svg";
import selectArrowActive from "../../../assets/selectArrowActive.svg";

const SelectL = ({
  options = [],
  value = "",
  onChange,
  width = "108px",
  height = "36px",
  className,
}) => {
  const selectRef = useRef(null);

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
    selectRef.current.blur();
  };

  return (
    <div className="selectL-container">
      <select
        ref={selectRef}
        onChange={handleChange}
        value={value}
        className={`selectL ${className || ""}`}
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
        className="selectLArrow-icon default"
      />
      <img
        src={selectArrowActive}
        alt="Select Arrow Active"
        className="selectLArrow-icon active"
      />
    </div>
  );
};

export default SelectL;