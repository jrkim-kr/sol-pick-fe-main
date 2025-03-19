import { useState, useRef, useEffect } from "react";
import "./Input.css";

const Input = ({
  type,
  placeholder,
  name,
  id,
  className,
  width = "343px",
  height = "36px",
  value, // 추가: 제어 컴포넌트를 위한 value prop
  onChange, // 추가: 제어 컴포넌트를 위한 onChange prop
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // 날짜 입력 필드에 대해서만 실행
    if (type === "date" && inputRef.current) {
      const input = inputRef.current;

      // 캘린더 아이콘 클릭 감지
      const handleClick = (e) => {
        const rect = input.getBoundingClientRect();
        // 입력 필드의 오른쪽 20% 영역(대략 아이콘 위치)을 클릭했는지 확인
        if (e.clientX > rect.right - rect.width * 0.2) {
          setIsCalendarOpen(true);
          input.style.borderColor = "#0A84FF";
        }
      };

      // 외부 클릭 감지하여 달력이 닫힐 때 상태 업데이트
      const handleOutsideClick = (e) => {
        if (!input.contains(e.target)) {
          setIsCalendarOpen(false);
          // 포커스가 없는 경우에만 테두리 색상 복원
          if (document.activeElement !== input) {
            input.style.borderColor = "#969696";
          }
        }
      };

      // 날짜 값 변경 감지
      const handleChange = () => {
        setIsCalendarOpen(false);
      };

      input.addEventListener("click", handleClick);
      input.addEventListener("change", handleChange);
      document.addEventListener("click", handleOutsideClick);

      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      return () => {
        input.removeEventListener("click", handleClick);
        input.removeEventListener("change", handleChange);
        document.removeEventListener("click", handleOutsideClick);
      };
    }
  }, [type]);

  const dateStyles =
    type === "date"
      ? {
          "--focus-color": "#0A84FF",
        }
      : {};

  return (
    <div className="input-container">
      <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        value={value} // 추가된 value prop 적용
        onChange={onChange} // 추가된 onChange prop 적용
        className={`input ${className || ""} ${
          type === "date" ? "date-input" : ""
        } ${isCalendarOpen ? "date-input-active" : ""}`}
        style={{ width, height, ...dateStyles }}
      />
    </div>
  );
};

export default Input;
