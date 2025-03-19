import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CardCompletionPage.css";

// 컴포넌트 불러오기
import CardCompletion from "../../components/card/CardCompletion";

// 헤더 및 푸터 관련 컴포넌트
import Header from "../../components/common/header/Header";
import Menu from "../../components/common/menu/Menu";

const CardCompletionPage = () => {
  const navigate = useNavigate();

  // 네비게이션 핸들러
  const handleConfirm = () => navigate("/main");

  return (
    <div className="card-completion-page-container">
      <Header title="발급 완료" />

      <div className="card-completion-component-container">
        <CardCompletion onConfirm={handleConfirm} />
      </div>

      <Menu />
    </div>
  );
};

export default CardCompletionPage;
