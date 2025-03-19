import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardIdentityVerificationPage.css";

// 카드 본인인증 컴포넌트
import CardIdentityVerification from "../../components/card/CardIdentityVerification";

// 헤더 및 푸터 관련 컴포넌트
import Header from "../../components/common/header/Header";
import Menu from "../../components/common/menu/Menu";

// 필요한 아이콘 import
import backArrow from "../../assets/backArrow.svg";
import close from "../../assets/close.svg";

const CardIdentityVerificationPage = () => {
  const navigate = useNavigate();

  // 네비게이션 핸들러
  const handleGoBack = () => navigate(-1);
  const handleClose = () => navigate("/card");

  return (
    <div className="identity-verification-page">
      <Header
        leftIcon={backArrow}
        title="본인 인증"
        rightIcon={close}
        onLeftClick={handleGoBack}
        onRightClick={handleClose}
      />

      <div className="identity-verification-page-content">
        <CardIdentityVerification />
      </div>

      <Menu />
    </div>
  );
};

export default CardIdentityVerificationPage;
