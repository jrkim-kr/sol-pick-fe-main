import { useMemo } from "react";
import NotiItem from "./NotiItem";
import "./NotiList.css";

const NotiList = ({ notifications = [], onNotificationClick }) => {
  // 날짜별로 알림 그룹화
  const groupedNotifications = useMemo(() => {
    // 오늘, 어제 날짜 계산
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // 날짜를 YYYY. MM. DD. 형식으로 변환하는 함수
    function formatYMD(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}. ${month}. ${day}.`;
    }

    const todayString = formatYMD(today);
    const yesterdayString = formatYMD(yesterday);

    // 날짜별로 그룹화
    const groups = {};

    notifications.forEach((noti) => {
      // ISO 문자열 날짜를 Date 객체로 변환
      const date = new Date(noti.createdAt);

      // 날짜 포맷팅
      const dateString = formatYMD(date);

      // 표시용 날짜 결정
      let displayDate;

      if (dateString === todayString) {
        displayDate = "오늘";
      } else if (dateString === yesterdayString) {
        displayDate = "어제";
      } else {
        // YYYY. MM. DD. 형식으로 표시
        displayDate = dateString;
      }

      // 그룹에 추가
      if (!groups[displayDate]) {
        groups[displayDate] = [];
      }

      // 시간 포맷팅 (HH:MM)
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const timeString = `${hours}:${minutes}`;

      groups[displayDate].push({
        ...noti,
        formattedTime: dateString + " " + timeString,
      });
    });

    // 각 그룹 내에서 시간별로 알림 정렬 (최신순)
    for (const date in groups) {
      groups[date].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }

    // 날짜별로 정렬 (최신순)
    return Object.entries(groups).sort((a, b) => {
      if (a[0] === "오늘") return -1;
      if (b[0] === "오늘") return 1;
      if (a[0] === "어제") return -1;
      if (b[0] === "어제") return 1;

      // 날짜 형식일 경우 역순으로 정렬
      const dateA = a[0].split(". ").map((n) => parseInt(n || "0"));
      const dateB = b[0].split(". ").map((n) => parseInt(n || "0"));

      // 연도 비교
      if (dateA[0] !== dateB[0]) return dateB[0] - dateA[0];
      // 월 비교
      if (dateA[1] !== dateB[1]) return dateB[1] - dateA[1];
      // 일 비교
      return dateB[2] - dateA[2];
    });
  }, [notifications]);

  if (notifications.length === 0) {
    return <div className="noti-empty">새로운 알림이 없습니다.</div>;
  }

  return (
    <div className="noti-list">
      {groupedNotifications.map(([date, notis], groupIndex) => (
        <div key={date} className="noti-group">
          <div className="noti-date">{date}</div>
          {notis.map((noti) => (
            <div
              key={noti.id}
              className="noti-item-wrapper"
              onClick={() => onNotificationClick && onNotificationClick(noti)}
            >
              <NotiItem
                type={noti.type}
                title={
                  noti.type === "expiration" ? "유통기한 알림" : "재구매 알림"
                }
                description={noti.message}
                timestamp={noti.formattedTime}
                isRead={noti.isRead}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NotiList;
