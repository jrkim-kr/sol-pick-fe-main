import { useEffect, useState } from "react";
import "./MainHeader.css";
import shop from "../../../assets/shop.svg";
import noti from "../../../assets/noti.svg";

import { notificationApi } from "../../../api/NotificationApi";
import { authApi } from "../../../api/AuthApi";
import { useNavigate } from "react-router-dom";

const MainHeader = (
  {
    // leftIcon,
    // rightIcon,
    // leftIconActive,
    // rightIconActive,
    // onLeftClick,
    // onRightClick,
  }
) => {
  // const [isLeftActive, setIsLeftActive] = useState(false);
  // const [isRightActive, setIsRightActive] = useState(false);

  const navigate = useNavigate();

  // 읽지 않은 알림 개수 상태 관리
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  // 읽지 않은 알림 개수 가져오기
  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      // 사용자 로그인 여부 확인
      const isLoggedIn = authApi.isAuthenticated();
      const currentUser = authApi.getCurrentUser();

      if (isLoggedIn && currentUser) {
        try {
          const count = await notificationApi.getUnreadCount(
            currentUser.memberId
          );
          setUnreadNotifications(count);
        } catch (error) {
          console.error("읽지 않은 알림 개수 가져오기 실패:", error);
        }
      }
    };

    fetchUnreadNotifications();

    // 주기적으로 알림 개수 업데이트
    const interval = setInterval(fetchUnreadNotifications, 60000); // 1분마다 업데이트

    return () => clearInterval(interval);
  }, []);

  // 샵 아이콘 클릭 핸들러
  const handleShopClick = () => {
    // setIsLeftActive(!isLeftActive);
    // 레시픽 쇼핑몰 이동
  };

  // 알림 아이콘 클릭 핸들러
  const handleNotiClick = () => {
    // setIsRightActive(!isRightActive);
    navigate("/noti");
  };

  return (
    <header className="mainHeader-container">
      <div className="mainHeader">
        <div className="icon-container">
          <img
            className="mainHeader-icon"
            // src={isLeftActive && leftIconActive ? leftIconActive : leftIcon}
            src={shop}
            alt="shopIcon"
            onClick={handleShopClick}
          />
          <div className="notification-icon-container">
            <img
              className="mainHeader-icon"
              // src={isRightActive && rightIconActive ? rightIconActive : rightIcon}
              src={noti}
              alt="notiIcon"
              onClick={handleNotiClick}
            />
            <span className="notification-badge bold">
              {unreadNotifications > 9 ? "9+" : unreadNotifications}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
