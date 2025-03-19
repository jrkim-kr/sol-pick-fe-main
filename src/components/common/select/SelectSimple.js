import React, { useRef } from "react";
import "./SelectSimple.css";
import selectArrow from "../../../assets/selectArrow.svg";
import selectArrowActive from "../../../assets/selectArrowActive.svg";

const SelectSimple = ({
  name,
  id,
  options = [],
  defaultValue = "",
  onChange,
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
    <div className="selectSimple-container">
      <select
        ref={selectRef}
        name={name}
        id={id}
        onChange={handleChange}
        defaultValue={defaultValue}
        className={`selectSimple ${className || ""}`}
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
        className="selectSimpleArrow-icon default"
      />
      <img
        src={selectArrowActive}
        alt="Select Arrow Active"
        className="selectSimpleArrow-icon active"
      />
    </div>
  );
};

export default SelectSimple;
