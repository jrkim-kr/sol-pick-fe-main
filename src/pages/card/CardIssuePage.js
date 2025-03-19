import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainHeader from "../../components/common/header/MainHeader";
import noti from "../../assets/noti.svg";
import notiActive from "../../assets/notiActive.svg";
import shop from "../../assets/shop.svg";
import shopActive from "../../assets/shopActive.svg";
import Menu from "../../components/common/menu/Menu";
import "./CardIssuePage.css";
import BasicDesignFront from "../../assets/card/basicDesign.svg";
import { checkHasCard } from "../../api/CardApi";

// 메인 컴포넌트
const CardIssuePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로그인 상태 확인
    const token = localStorage.getItem("token");
    console.log("토큰 존재 여부:", !!token);

    if (!token) {
      console.log("토큰이 없어 로그인 페이지로 이동합니다.");
      navigate("/login");
      return;
    }

    // 카드 소유 여부 확인
    const checkCardStatus = async () => {
      try {
        console.log("카드 상태 확인 시작");
        const hasCard = await checkHasCard();
        console.log("카드 소유 여부:", hasCard);

        if (hasCard) {
          // 카드가 있으면 포인트 페이지로 이동
          console.log("카드가 있어 포인트 페이지로 이동합니다.");
          navigate("/card/points");
        } else {
          // 카드가 없으면 현재 페이지(카드 발급 페이지) 표시
          console.log("카드가 없어 현재 페이지를 표시합니다.");
          setLoading(false);
        }
      } catch (error) {
        console.error("카드 상태 확인 중 오류 발생:", error);
        setLoading(false);
      }
    };

    checkCardStatus();
  }, [navigate]);

  const navigateToShop = () => {};
  const navigateToNoti = () => {};

  const handleCardDetail = () => {
    navigate("/card/detail");
  };

  const handleCardIssue = () => {
    navigate("/card/detail");
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="card-issue-page-container">
      <MainHeader
        leftIcon={shop}
        leftIconActive={shopActive}
        rightIcon={noti}
        rightIconActive={notiActive}
        onLeftClick={navigateToShop}
        onRightClick={navigateToNoti}
      />

      <div className="card-detail-handler-container" onClick={handleCardDetail}>
        <img
          src={BasicDesignFront}
          alt="Basic Design Front"
          className="basic-design-front"
        />
      </div>

      <div className="message-container">
        <h2 className="message-title">
          아직 쏠픽(SOL Pick) 카드가 없으신가요?
        </h2>
        <p className="message-subtext">
          쏠픽(SOL Pick) 카드를 발급받고 다양한 혜택을 누려보세요.
        </p>
        <button className="issue-button" onClick={handleCardIssue}>
          카드 발급받기
        </button>
      </div>

      <Menu />
    </div>
  );
};

export default CardIssuePage;
