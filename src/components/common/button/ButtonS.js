import "./ButtonS.css";

const ButtonS = ({
  text,
  onClick,
  id,
  width = "140px",
  height = "40px",
  type,
  className,
  variant = "filled",
  disabled = false,
}) => {
  return (
    <>
      <button
        className={`buttonS buttonS-${variant} ${
          disabled ? "buttonS-disabled" : ""
        } ${className || ""}`}
        onClick={disabled ? undefined : onClick}
        id={id}
        style={{ width, height }}
        type={type}
        disabled={disabled}
      >
        {text}
      </button>
    </>
  );
};

export default ButtonS;
