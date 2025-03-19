import React from "react";
import "./MyPageMenuItem.css";

// 아이콘 SVG 컴포넌트들
const StarIcon = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 65 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M32.5 10L38.8843 23.2295L53.4129 25.2459L42.9564 35.3705L45.2686 49.8541L32.5 43L19.7314 49.8541L22.0436 35.3705L11.5871 25.2459L26.1157 23.2295L32.5 10Z"
      stroke="#0A84FF"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const OrderIcon = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 65 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M43.3333 16.25H21.6667C21.2064 16.25 20.8333 16.6231 20.8333 17.0833V48.75C20.8333 49.2103 21.2064 49.5833 21.6667 49.5833H43.3333C43.7936 49.5833 44.1667 49.2103 44.1667 48.75V17.0833C44.1667 16.6231 43.7936 16.25 43.3333 16.25Z"
      stroke="#0A84FF"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M27.0833 24.375H37.9167"
      stroke="#0A84FF"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M27.0833 32.5H37.9167"
      stroke="#0A84FF"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M27.0833 40.625H32.5"
      stroke="#0A84FF"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 65 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="16.25"
      y="29.7917"
      width="32.5"
      height="21.6667"
      rx="2"
      stroke="#0A84FF"
      strokeWidth="3"
    />
    <path
      d="M21.6667 29.7917V21.6667C21.6667 16.1439 26.1439 11.6667 31.6667 11.6667H32.5C38.0228 11.6667 42.5 16.1439 42.5 21.6667V29.7917"
      stroke="#0A84FF"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M32.5 37.9167V43.3333"
      stroke="#0A84FF"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.6389 7.27778C11.6389 8.996 10.246 10.3889 8.52778 10.3889M11.6389 7.27778C11.6389 6.40725 11.2813 5.62023 10.7051 5.05556M11.6389 7.27778C12.2315 7.12963 12.75 7 13.9667 7.27778M8.52778 10.3889C7.68009 10.3889 6.91158 10.0499 6.35045 9.5M8.52778 10.3889C8.67593 10.6852 8.75 11 8.75 12.5M5.41667 7.27778C5.41667 6.40725 5.77421 5.62023 6.35045 5.05556M5.41667 7.27778C4.97222 7.12963 4.25 7 3 7.5M5.41667 7.27778C5.41667 8.14831 5.77421 8.93533 6.35045 9.5M8.52778 4.16667C9.37547 4.16667 10.144 4.50569 10.7051 5.05556M8.52778 4.16667C8.37963 3.57407 8.25 3 8.75 2M8.52778 4.16667C7.68009 4.16667 6.91158 4.50569 6.35045 5.05556M10.7051 5.05556C11.3127 4.90741 12.0833 4.71552 12.75 3.5M10.75 9.5C11.1944 9.7963 12.122 10.3889 12.25 11.5M6.35045 5.05556C6.03919 4.61111 5.31667 3.85556 4.25 3.5M6.35045 9.5C6.03919 9.7963 5.25 10 4.75 11.5"
      stroke="#0A84FF"
      strokeWidth="0.888889"
      strokeLinecap="round"
    />
    <path
      d="M19.5142 17.8688C19.5142 18.9655 18.6251 19.8546 17.5284 19.8546M19.5142 17.8688C19.5142 17.3131 19.2859 16.8108 18.9181 16.4503M19.5142 17.8688C19.8924 17.7742 20.2234 17.6915 21 17.8688M17.5284 19.8546C16.9873 19.8546 16.4967 19.6382 16.1386 19.2872M17.5284 19.8546C17.6229 20.0437 17.6702 20.2447 17.6702 21.2021M15.5425 17.8688C15.5425 17.3131 15.7708 16.8108 16.1386 16.4503M15.5425 17.8688C15.2589 17.7742 14.7979 17.6915 14 18.0106M15.5425 17.8688C15.5425 18.4244 15.7708 18.9268 16.1386 19.2872M17.5284 15.883C18.0694 15.883 18.56 16.0994 18.9181 16.4503M17.5284 15.883C17.4338 15.5047 17.351 15.1383 17.6702 14.5M17.5284 15.883C16.9873 15.883 16.4967 16.0994 16.1386 16.4503M18.9181 16.4503C19.3059 16.3558 19.7978 16.2333 20.2234 15.4574M18.9468 19.2872C19.2305 19.4763 19.8225 19.8546 19.9042 20.5638M16.1386 16.4503C15.9399 16.1667 15.4787 15.6844 14.7979 15.4574M16.1386 19.2872C15.9399 19.4763 15.4362 19.6064 15.117 20.5638"
      stroke="#0A84FF"
      strokeWidth="0.8"
      strokeLinecap="round"
    />
    <circle cx="16.5" cy="10.5" r="0.5" fill="#0A84FF" />
    <circle cx="17.5" cy="4.5" r="0.5" fill="#0A84FF" />
    <circle cx="5.5" cy="14.5" r="0.5" fill="#0A84FF" />
    <circle cx="3.5" cy="18.5" r="0.5" fill="#0A84FF" />
    <circle cx="10.5" cy="15.5" r="0.5" fill="#0A84FF" />
    <circle cx="7" cy="17.5" r="0.5" fill="#0A84FF" />
    <circle cx="11.5" cy="20.5" r="0.5" fill="#0A84FF" />
    <circle cx="20.5" cy="8.5" r="0.5" fill="#0A84FF" />
  </svg>
);

// 아이콘 타입에 따라 적절한 아이콘 컴포넌트 반환
const getIconComponent = (iconType) => {
  switch (iconType) {
    case "star":
      return <StarIcon />;
    case "order":
      return <OrderIcon />;
    case "lock":
      return <LockIcon />;
    case "user":
      return <UserIcon />;
    default:
      return null;
  }
};

const MyPageMenuItem = ({ title, icon, onClick }) => {
  return (
    <div className="mypage-menu-item" onClick={onClick}>
      {getIconComponent(icon)}
      <p>{title}</p>
    </div>
  );
};

export default MyPageMenuItem;
