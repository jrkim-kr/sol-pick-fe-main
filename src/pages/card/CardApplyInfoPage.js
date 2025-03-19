import React from "react";
import { useNavigate } from "react-router-dom";

// 카드 신청 정보 입력 컴포넌트
import CardApplyForm from "../../components/card/CardApplyForm";
import "./CardApplyInfoPage.css";

// 헤더 및 푸터 관련 컴포넌트
import Header from "../../components/common/header/Header";
import Menu from "../../components/common/menu/Menu";

// 필요한 아이콘 import
import backArrow from "../../assets/backArrow.svg";
import close from "../../assets/close.svg";

const CardApplyInfoPage = () => {
  const navigate = useNavigate();

  // 네비게이션 핸들러
  const handleGoBack = () => navigate(-2);
  const handleClose = () => navigate("/card");
  const handleNext = () => navigate("/card/apply/completion");

  return (
    <div className="card-apply-info-page-container">
      <Header
        leftIcon={backArrow}
        title="카드 신청 정보 입력"
        rightIcon={close}
        onLeftClick={handleGoBack}
        onRightClick={handleClose}
      />

      <div className="card-apply-info-component-container">
        <CardApplyForm onNext={handleNext} />
      </div>

      <Menu />
    </div>
  );
};

export default CardApplyInfoPage;
