import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Menu.css";
import refrigerator from "../../../assets/refrigerator.svg";
import refrigeratorActive from "../../../assets/refrigeratorActive.svg";
import card from "../../../assets/card.svg";
import cardActive from "../../../assets/cardActive.svg";
import home from "../../../assets/home.svg";
import homeActive from "../../../assets/homeActive.svg";
import mypage from "../../../assets/mypage.svg";
import mypageActive from "../../../assets/mypageActive.svg";
import { authApi } from "../../../api/AuthApi";
import { useToast } from "../../../context/ToastContext";

const Menu = () => {
  const [activeMenu, setActiveMenu] = useState("home");
  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL 경로 가져오기
  const { showToast } = useToast();

  const menuItems = [
    {
      id: "home",
      icon: home,
      activeIcon: homeActive,
      label: "홈",
      path: "/main",
    },
    {
      id: "card",
      icon: card,
      activeIcon: cardActive,
      label: "카드",
      path: "/card",
    },
    {
      id: "refrigerator",
      icon: refrigerator,
      activeIcon: refrigeratorActive,
      label: "냉장고",
      path: "/refrigerator",
    },
    {
      id: "mypage",
      icon: mypage,
      activeIcon: mypageActive,
      label: "마이페이지",
      path: "/mypage",
    },
  ];

  // 경로 변경될 때마다 activeMenu 상태 업데이트
  useEffect(() => {
    const currentPath = location.pathname;

    // 현재 경로에 맞는 메뉴 ID 찾기
    const currentMenu = menuItems.find((item) =>
      currentPath.startsWith(item.path)
    );

    // 일치하는 메뉴가 있으면 활성화, 없으면 기본값(home)으로 설정
    setActiveMenu(currentMenu ? currentMenu.id : "home");
  }, [location.pathname]);

  const handleMenuClick = (menuId) => {
    // 탭을 클릭했을 때 로그인 여부 확인
    const requiresAuth = ["refrigerator", "card"];
    if (requiresAuth.includes(menuId) && !authApi.isAuthenticated()) {
      showToast("먼저 로그인 해주세요.");
      navigate("/login");
      return;
    }

    setActiveMenu(menuId);
    // 페이지 이동 작업
    const menuItem = menuItems.find((item) => item.id === menuId);
    // 해당 경로로 이동
    if (menuItem && menuItem.path) {
      navigate(menuItem.path);
    }
  };

  return (
    <nav className="menu-container">
      <div className="menu">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`menu-item ${activeMenu === item.id ? "active" : ""}`}
            onClick={() => handleMenuClick(item.id)}
          >
            <img
              src={activeMenu === item.id ? item.activeIcon : item.icon}
              alt={item.label}
              className="menu-icon"
            />
            <span className="menu-label">{item.label}</span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Menu;
