import "./Noti.css";
import Header from "../../components/common/header/Header";
import backArrow from "../../assets/backArrow.svg";
import home from "../../assets/home.svg";
import Chip from "../../components/common/chip/Chip";
import { useEffect, useState } from "react";
import NotiList from "../../components/noti/noti-list/NotiList";
import { notificationApi } from "../../api/NotificationApi";
import { authApi } from "../../api/AuthApi";
import { useNavigate } from "react-router-dom";

const Noti = () => {
  const navigate = useNavigate();
  const chipItems = ["전체", "유통기한", "재구매"];

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(0);

  useEffect(() => {
    // API에서 알림 데이터를 가져오는 함수
    const fetchNotifications = async () => {
      try {
        setLoading(true);

        // 사용자 정보 가져오기
        const currentUser = authApi.getCurrentUser();

        if (currentUser && currentUser.memberId) {
          const data = await notificationApi.getNotifications(
            currentUser.memberId
          );

          // console.log("서버에서 받아온 알림 데이터:", data);

          setNotifications(data);
        } else {
          // 로그인 안 된 경우 로그인 페이지로 이동
          navigate("/login");
        }

        setLoading(false);
      } catch (error) {
        console.error("알림 불러오는 중 오류 발생:", error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // 알림 클릭 핸들러
  const handleNotificationClick = async (notification) => {
    // 알림이 읽지 않은 상태라면 읽음 처리
    if (!notification.isRead) {
      try {
        console.log("알림 읽음 처리 시작:", notification.id);

        // API 호출 전에 UI 업데이트는 하지 않음
        const success = await notificationApi.markAsRead(notification.id);
        console.log("알림 읽음 처리 결과:", success);

        if (success) {
          // API 호출이 성공한 후에만 UI 업데이트
          console.log("알림 읽음 상태 UI 업데이트");
          setNotifications((prev) =>
            prev.map((item) =>
              item.id === notification.id ? { ...item, isRead: true } : item
            )
          );
        } else {
          console.error(
            "알림 읽음 처리 실패: 서버에서 성공 응답을 반환하지 않음"
          );
        }
      } catch (error) {
        console.error("알림 읽음 처리 오류:", error);
      }
    }
    // 알림 타입에 따른 페이지 이동
    if (notification.type === "expiration") {
      navigate("/refrigerator");
    }

    // 다른 타입의 알림에 대한 처리 추가
  };

  // 칩 필터링
  const filteredNotifications = notifications.filter((noti) => {
    if (selectedFilter === 0) return true;
    if (selectedFilter === 1) return noti.type === "expiration";
    if (selectedFilter === 2) return noti.type === "reorder";
    return false;
  });

  return (
    <>
      <Header
        leftIcon={backArrow}
        title="알림"
        rightIcon={home}
        onLeftClick={() => {
          window.history.back();
        }}
        onRightClick={() => {
          navigate("/main");
        }}
      />

      <Chip
        items={chipItems}
        initialSelected={0}
        onSelect={setSelectedFilter}
      />

      {loading ? (
        <div className="noti-loading">알림을 불러오는 중...</div>
      ) : (
        <NotiList
          notifications={filteredNotifications}
          onNotificationClick={handleNotificationClick}
        />
      )}
    </>
  );
};
export default Noti;
