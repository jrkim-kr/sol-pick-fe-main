import React from "react";
import detailArrow from "../../../assets/detailArrow.svg";
import "./IngredientDetailContent.css";

const IngredientDetailContent = ({ ingredient }) => {
  if (!ingredient) return null;

  // 날짜 포맷팅 함수 (날짜만)
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // 날짜와 시간 포맷팅 함수 (시간 포함)
  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);

    // 날짜 부분
    const dateFormatted = date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    // 시간 부분 (24시간 형식)
    const timeFormatted = date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24시간 형식 사용
    });

    return `${dateFormatted} ${timeFormatted}`;
  };

  // // 이미지 소스 결정 (등록된 이미지가 없으면 기본 이미지 사용)
  // const imageSource = ingredient.image || "/path/to/default-image.png";

  return (
    <div className="ingpopup-description-container">
      <div className="ingpopup-description-category">
        <p className="ingmain-category">
          {ingredient.mainCategory || "대분류"}
        </p>
        <img
          src={detailArrow}
          alt="detailArrow"
          className="ingdetailArrow-icon"
        />
        <p className="ingsub-category">{ingredient.subCategory || "중분류"}</p>
        <img
          src={detailArrow}
          alt="detailArrow"
          className="ingdetailArrow-icon"
        />
        <p className="ingdetail-category">
          {ingredient.detailCategory || "소분류"}
        </p>
      </div>

      <img
        src={ingredient.image}
        alt={ingredient.name}
        className="ingpopup-description-image"
      />

      <div className="ingpopup-description">
        <p className="ingpopup-description-label">유통기한</p>
        <p className="ingpopup-description-expiration">
          {ingredient.expiryDate
            ? formatDate(ingredient.expiryDate)
            : "유통기한"}
        </p>
      </div>

      <div className="ingpopup-description">
        <p className="ingpopup-description-label">보유량</p>
        <p className="ingpopup-description-gram">
          {ingredient.quantity ? `${ingredient.quantity}g` : "보유량"}
        </p>
      </div>

      <div className="ingpopup-description">
        <p className="ingpopup-description-label">등록일</p>
        <p className="ingpopup-description-adddate">
          {ingredient.createdAt
            ? formatDateTime(ingredient.createdAt)
            : "등록일"}
        </p>
      </div>
    </div>
  );
};

export default IngredientDetailContent;
