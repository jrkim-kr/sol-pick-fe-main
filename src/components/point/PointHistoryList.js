import React, { useMemo } from "react";
import PointHistoryItem from "./PointHistoryItem";
import "./PointHistoryList.css";

const PointHistoryList = ({ pointHistory = [] }) => {
    // 날짜별로 포인트 내역 그룹화
    const groupedPoints = useMemo(() => {
        // 날짜를 기준으로 그룹화
        const groups = {};

        pointHistory.forEach((point) => {
            // 날짜 정보
            const date = point.date;

            // 그룹에 추가
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(point);
        });

        // 날짜별로 정렬 (최신순)
        return Object.entries(groups).sort((a, b) => {
            // 월과 일 추출
            const [monthA, dayA] = a[0].split(".");
            const [monthB, dayB] = b[0].split(".");

            // 월 비교
            const monthDiff = parseInt(monthB) - parseInt(monthA);
            if (monthDiff !== 0) return monthDiff;

            // 일 비교
            return parseInt(dayB) - parseInt(dayA);
        });
    }, [pointHistory]);

    if (pointHistory.length === 0) {
        return <div className="point-empty">포인트 내역이 없습니다.</div>;
    }

    return (
        <div className="point-list">
            {groupedPoints.map(([date, points], groupIndex) => (
                <div key={date} className="point-group">
                    <div className="point-date-header">{date}</div>
                    {points.map((point, index) => (
                        <PointHistoryItem
                            key={`${date}-${index}`}
                            description={point.description}
                            amount={point.amount}
                            date={point.date}
                            type={point.type}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default PointHistoryList;