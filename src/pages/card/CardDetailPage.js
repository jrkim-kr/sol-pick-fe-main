import React from "react";
import { useNavigate } from "react-router-dom";

// 카드 성세 컴포넌트
import CardDetail from "../../components/card/CardDetail";
import "./CardDetailPage.css";

// 헤더 및 푸터 관련 컴포넌트
import Header from "../../components/common/header/Header";
import Menu from "../../components/common/menu/Menu";

// 필요한 아이콘 import
import backArrow from "../../assets/backArrow.svg";
import close from "../../assets/close.svg";

const CardDetailPage = () => {
  const navigate = useNavigate();

  // 네비게이션 핸들러
  const handleGoBack = () => navigate(-1);
  const handleClose = () => navigate("/card");
  const handleNext = () => navigate("/card/apply/design");

  // 카드 상세 데이터 (실제 구현에서는 API로 가져올 수 있음)
  const cardData = {
    cardName: "신한카드",
    cardSubName: "쏠픽(SOL Pick)",
    benefits: [
      {
        benefitTitle1: "음식점 ",
        benefitDetail1: "1 % 할인",
        benefitTitle2: "ReciPICK 몰에서 결제 시 ",
        benefitDetail2: "추가 1% 포인트 적립",
        benefitTitle3: "회원 전용 서비스 혜택 - ",
        benefitDetail3: "SOL Pick APP",
      },
    ],
  };

  return (
    <div className="card-detail-page-container">
      <Header
        leftIcon={backArrow}
        title="신한카드 쏠픽(SOL Pick)"
        rightIcon={close}
        onLeftClick={handleGoBack}
        onRightClick={handleClose}
      />

      <div className="card-detail-component-container">
        <CardDetail cardData={cardData} onNext={handleNext} />
      </div>

      <Menu />
    </div>
  );
};

export default CardDetailPage;
