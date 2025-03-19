import React from "react";
import "./OrderHistoryItem.css";

const OrderHistoryItem = ({
  itemName,
  price,
  orderDateTime,
  showDate = false,
}) => {
  // 시간 포맷팅
  // const formatTime = (dateTimeStr) => {
  //     const date = new Date(dateTimeStr);
  //     const hours = String(date.getHours()).padStart(2, "0");
  //     const minutes = String(date.getMinutes()).padStart(2, "0");
  //     return `${hours}:${minutes}`;
  // };

  // // 가격 포맷팅
  // const formatPrice = (price) => {
  //     return price.toLocaleString() + "원";
  // };

  return (
    <div className="order-item">
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="order-icon"
      >
        <rect width="36" height="36" rx="18" fill="#F3F0FF" />
        <path
          d="M11 10C11 10 11 8 13 8H23C25 8 25 10 25 10V26C25 26 25 28 23 28H13C11 28 11 26 11 26V10Z"
          fill="white"
          stroke="#0A84FF"
          strokeWidth="1.5"
        />
        <path
          d="M15 14H21"
          stroke="#0A84FF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M15 18H21"
          stroke="#0A84FF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M15 22H19"
          stroke="#0A84FF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <div className="order-description">
        <div className="order-header">
          <p className="order-name bold">{itemName}</p>
          {/* <p className="order-price">{formatPrice(price)}</p> */}
        </div>
        {/* <p className="order-time">{formatTime(orderDateTime)}</p> */}
      </div>
    </div>
  );
};

export default OrderHistoryItem;
