import React from "react";
import { useNavigate } from "react-router-dom";

// 카드 성세 컴포넌트
import CardTerms from "../../components/card/CardTerms";
import "./CardTermsPage.css";

// 헤더 및 푸터 관련 컴포넌트
import Header from "../../components/common/header/Header";
import Menu from "../../components/common/menu/Menu";

// 필요한 아이콘 import
import backArrow from "../../assets/backArrow.svg";
import close from "../../assets/close.svg";

const CardTermsPage = () => {
  const navigate = useNavigate();

  // 네비게이션 핸들러
  const handleGoBack = () => navigate(-1);
  const handleClose = () => navigate("/card");
  const handleNext = () => navigate("/card/apply/credit-rating");

  return (
    <div className="card-terms-page-container">
      <Header
        leftIcon={backArrow}
        title="약관 동의"
        rightIcon={close}
        onLeftClick={handleGoBack}
        onRightClick={handleClose}
      />

      <div className="card-terms-component-container">
        <CardTerms onNext={handleNext} />
      </div>

      <Menu />
    </div>
  );
};

export default CardTermsPage;
