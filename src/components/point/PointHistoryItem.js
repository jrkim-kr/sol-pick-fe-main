import React from "react";
import "./PointHistoryItem.css";

const PointHistoryItem = ({
    description,
    amount,
    date,
    type
}) => {
    // 적립인지 사용인지에 따라 아이콘과 금액 스타일 결정
    const isEarn = type === "EARN";

    // 가격 포맷팅 (3자리마다 콤마 추가)
    const formatAmount = (amount) => {
        return amount.toLocaleString() + "원";
    };

    return (
        <div className="point-item">
            <div className="point-icon-container">
                <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="point-icon"
                >
                    <rect width="36" height="36" rx="18" fill={isEarn ? "#F3F0FF" : "#F0F9FF"} />
                    {isEarn ? (
                        // 적립 아이콘
                        <path
                            d="M14 18L17 21L22 15"
                            stroke="#38bdf8"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    ) : (
                        // 사용 아이콘
                        <path
                            d="M18 14V22M14 18H22"
                            stroke="#0EA5E9"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    )}
                </svg>
            </div>
            <div className="point-description">
                <div className="point-header">
                    <p className="point-name bold">{description}</p>
                    <p className={`point-amount ${isEarn ? "earn" : "use"}`}>
                        {isEarn ? "+" : "-"}{formatAmount(amount)}
                    </p>
                </div>
                <p className="point-date">{date}</p>
            </div>
        </div>
    );
};

export default PointHistoryItem;