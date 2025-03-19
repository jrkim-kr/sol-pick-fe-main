import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPageContent.css";
import { authApi } from "../../api/AuthApi";
import ButtonS from "../common/button/ButtonS";
import MyPageMenuItem from "./MyPageMenuItem";
import { useToast } from "../../context/ToastContext";

const MyPageContent = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // 사용자 로그인 여부 확인
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 현재 사용자 정보와 로그인 상태 가져오기
    const user = authApi.getCurrentUser();
    const loggedIn = authApi.isAuthenticated();

    setCurrentUser(user);
    setIsLoggedIn(loggedIn);
  }, []);

  // 로그인 버튼 핸들러
  const handleLoginClick = () => {
    navigate("/login");
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    // 먼저 로그아웃 처리
    authApi.logout();

    showToast("로그아웃 되었습니다.");

    // 로그아웃 처리 후 메인 페이지로 이동
    navigate("/main");
  };

  // 각 메뉴 항목
  const menuItems = [
    {
      id: "favorites",
      title: "찜한 레시피",
      icon: "star",
      path: "/mypage/favorites",
    },
    {
      id: "order",
      title: "결제 내역",
      icon: "order",
      path: "/mypage/orders",
    },
    {
      id: "user-info",
      title: "개인정보",
      icon: "lock",
      path: "/account",
    },
    {
      id: "account",
      title: "알러지 정보",
      icon: "user",
      path: "/account/settings",
    },
  ];

  return (
    <div className="mypage-container">
      <div className="mypage-header">
        <h1 className="mypage-title">마이페이지</h1>
        {isLoggedIn && (
          <p className="mypage-greeting">
            안녕하세요,{" "}
            <span className="bold">{currentUser?.name || "회원"}</span>님
          </p>
        )}
      </div>

      {!isLoggedIn ? (
        <div className="login-banner-container">
          <p className="login-banner-ment">
            지금 바로 로그인하고
            <br />
            SOL Pick의 다양한 혜택을 경험해보세요!
          </p>
          <div className="login-banner-button-container">
            <ButtonS
              text="회원가입"
              variant="outlined"
              width="88px"
              height="24px"
            />
            <ButtonS
              text="로그인"
              width="88px"
              height="24px"
              onClick={handleLoginClick}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="mypage-menu-grid">
            {menuItems.map((item) => (
              <MyPageMenuItem
                key={item.id}
                title={item.title}
                icon={item.icon}
                onClick={() => navigate(item.path)}
              />
            ))}
          </div>

          <div className="mypage-ad-banner">
            <p>SOL Pick 추천 혜택</p>
          </div>

          <div className="mypage-logout-container">
            <ButtonS
              text="로그아웃"
              onClick={handleLogout}
              variant="outlined"
              width="100px"
              height="36px"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MyPageContent;
