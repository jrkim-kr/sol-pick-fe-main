import "./ButtonL.css";

const ButtonL = ({
  text,
  onClick,
  id,
  width = "343px",
  height = "48px",
  type,
  className,
  variant = "filled",
  disabled = false,
}) => {
  return (
    <>
      <button
        className={`buttonL buttonL-${variant} ${
          disabled ? "buttonL-disabled" : ""
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

export default ButtonL;
