import "./Header.css";

const Header = ({
  leftIcon,
  title,
  rightIcon,
  onLeftClick,
  onRightClick,
  titleStyle = {}, // 새로운 prop 추가: 제목 스타일 커스터마이징용
}) => {
  // 왼쪽 아이콘과 오른쪽 아이콘의 존재 여부 확인
  const hasLeftIcon = !!leftIcon;
  const hasRightIcon = !!rightIcon;

  // 아이콘 배치 스타일 결정
  const getJustifyContent = () => {
    if (hasLeftIcon && hasRightIcon) return "space-between";
    if (hasLeftIcon) return "flex-start";
    if (hasRightIcon) return "flex-end";
    return "center";
  };

  return (
    <header className="header-container">
      <div className="header" style={{ justifyContent: getJustifyContent() }}>
        {leftIcon && (
          <img
            className="header-icon"
            src={leftIcon}
            alt="left icon"
            onClick={onLeftClick}
          />
        )}

        {/* style prop에 titleStyle 객체를 적용 */}
        <div className="header-title bold" style={titleStyle}>
          {title}
        </div>

        {rightIcon && (
          <img
            className="header-icon"
            src={rightIcon}
            alt="right icon"
            onClick={onRightClick}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
