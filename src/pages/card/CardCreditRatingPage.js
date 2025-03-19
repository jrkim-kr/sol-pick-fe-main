import React from "react";
import { useNavigate } from "react-router-dom";

// 카드 성세 컴포넌트
import CardCreditRating from "../../components/card/CardCreditRating";
import "./CardCreditRatingPage.css";

// 헤더 및 푸터 관련 컴포넌트
import Header from "../../components/common/header/Header";
import Menu from "../../components/common/menu/Menu";

// 필요한 아이콘 import
import backArrow from "../../assets/backArrow.svg";
import close from "../../assets/close.svg";

const CardCreditRatingPage = () => {
  const navigate = useNavigate();

  // 네비게이션 핸들러
  const handleGoBack = () => navigate(-1);
  const handleClose = () => navigate("/card");
  const handleNext = () => navigate("/card/apply/apply-info");

  return (
    <div className="card-credit-rating-page-container">
      <Header
        leftIcon={backArrow}
        title="신용 정보 확인"
        rightIcon={close}
        onLeftClick={handleGoBack}
        onRightClick={handleClose}
      />

      <div className="card-credit-rating-component-container">
        <CardCreditRating onNext={handleNext} />
      </div>

      <Menu />
    </div>
  );
};

export default CardCreditRatingPage;
