import React, { useMemo } from "react";
import OrderHistoryItem from "./OrderHistoryItem";
import "./OrderHistoryList.css";

const OrderHistoryList = ({ orderHistory = [] }) => {
    // 날짜별로 주문 내역 그룹화
    const groupedOrders = useMemo(() => {
        // 오늘, 어제 날짜 계산
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        // 날짜를 YYYY-MM-DD 형식으로 변환하는 함수
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

        orderHistory.forEach((order) => {
            // ISO 날짜 문자열에서 날짜 부분만 추출
            const orderDate = new Date(order.orderDateTime);
            const datePart = formatYMD(orderDate);

            // 표시용 날짜 결정
            let displayDate;

            // "오늘", "어제" 문자열 비교
            if (datePart === todayString) {
                displayDate = "오늘";
            } else if (datePart === yesterdayString) {
                displayDate = "어제";
            } else {
                displayDate = datePart;
            }

            // 그룹에 추가
            if (!groups[displayDate]) {
                groups[displayDate] = [];
            }
            groups[displayDate].push(order);
        });

        // 각 그룹 내에서 시간별로 주문 정렬 (최신순)
        for (const date in groups) {
            groups[date].sort((a, b) => {
                return new Date(b.orderDateTime) - new Date(a.orderDateTime);
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
    }, [orderHistory]);

    if (orderHistory.length === 0) {
        return <div className="order-empty">주문 내역이 없습니다.</div>;
    }

    return (
        <div className="order-list">
            {groupedOrders.map(([date, orders], groupIndex) => (
                <div key={date} className="order-group">
                    <div className="order-date">{date}</div>
                    {orders.map((order, index) => (
                        <OrderHistoryItem
                            key={`${date}-${index}`}
                            itemName={order.itemName}
                            price={order.price}
                            orderDateTime={order.orderDateTime}
                            showDate={false} // 이미 그룹 상단에 날짜가 표시되므로 개별 아이템엔 표시하지 않음
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default OrderHistoryList;