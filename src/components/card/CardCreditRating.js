import React, { useState } from "react";
import "./CardCreditRating.css";
import detailArrow from "../../assets/detailArrow.svg";

const CardCreditRating = ({ onNext }) => {
  // 연소득, 신용점수 선택 상태 관리
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [selectedCreditScore, setSelectedCreditScore] = useState(null);
  const [checked, setChecked] = useState(false);

  // 연소득 선택 핸들러
  const handleIncomeSelection = (income) => {
    setSelectedIncome(income);
  };

  // 신용점수 선택 핸들러
  const handleCreditScoreSelection = (score) => {
    setSelectedCreditScore(score);
  };

  // 체크박스 토글 핸들러
  const toggleChecked = () => {
    setChecked(!checked);
  };

  // 다음 버튼 활성화 여부 확인
  const isNextEnabled = selectedIncome && selectedCreditScore && checked;

  return (
    <div className="card-credit-rating-container">
      <div className="card-credit-rating-content">
        {/* 진행 단계 표시 */}
        <div className="step-indicator">
          <div className="active"></div>
          <div className="active"></div>
          <div className="active"></div>
          <div className="active"></div>
          <div></div>
          <div></div>
        </div>

        <p className="step-number">4 / 6</p>

        <div className="rating-header-section">
          <div className="rating page-title">
            <h2>카드를 안전하게 쓰기 위해 몇 가지 확인이 필요해요</h2>
          </div>
          <div className="info-link">
            <span>연소득과 신용점수는 왜 확인하나요?</span>
            <span className="info-icon">ⓘ</span>
          </div>
        </div>

        {/* 연소득 선택 섹션 */}
        <div className="income-title">연소득</div>
        <div className="selection-grid income-grid">
          <button
            className={`selection-button ${
              selectedIncome === "1억원 초과" ? "selected" : ""
            }`}
            onClick={() => handleIncomeSelection("1억원 초과")}
          >
            1억원 초과
          </button>
          <button
            className={`selection-button ${
              selectedIncome === "5,000만원 초과\n1억원 이하" ? "selected" : ""
            }`}
            onClick={() => handleIncomeSelection("5,000만원 초과\n1억원 이하")}
          >
            5,000만원 초과
            <br />
            1억원 이하
          </button>
          <button
            className={`selection-button ${
              selectedIncome === "600만원 초과\n5,000만원 이하"
                ? "selected"
                : ""
            }`}
            onClick={() =>
              handleIncomeSelection("600만원 초과\n5,000만원 이하")
            }
          >
            600만원 초과
            <br />
            5,000만원 이하
          </button>
          <button
            className={`selection-button ${
              selectedIncome === "600만원 이하" ? "selected" : ""
            }`}
            onClick={() => handleIncomeSelection("600만원 이하")}
          >
            600만원 이하
          </button>
        </div>

        {/* 신용점수 선택 섹션 */}
        <div className="credit-title">신용점수</div>
        <div className="selection-grid credit-grid">
          <button
            className={`selection-button ${
              selectedCreditScore === "700점 초과" ? "selected" : ""
            }`}
            onClick={() => handleCreditScoreSelection("700점 초과")}
          >
            700점 초과
          </button>
          <button
            className={`selection-button ${
              selectedCreditScore === "500점 초과\n700점 이하" ? "selected" : ""
            }`}
            onClick={() => handleCreditScoreSelection("500점 초과\n700점 이하")}
          >
            500점 초과
            <br />
            700점 이하
          </button>
          <button
            className={`selection-button ${
              selectedCreditScore === "500점 이하" ? "selected" : ""
            }`}
            onClick={() => handleCreditScoreSelection("500점 이하")}
          >
            500점 이하
          </button>
        </div>

        {/* 필수 확인사항 체크박스 */}
        <div className="required-check-container">
          <div className="required-check-title">필수 확인사항</div>
          <div className="rating-checkbox-container">
            <label className="rating-checkbox-label">
              <input
                type="checkbox"
                checked={checked}
                onChange={toggleChecked}
                className="rating-checkbox-input"
              />
              <span className="rating-checkbox-text">
                신용카드 설명서 및 상품안내장 확인
              </span>
            </label>
          </div>
        </div>

        {/* 안내 텍스트 */}
        <div className="help-text">
          <p>상품에 대해 더 궁금하시면, 아래 전화상담을 이용해 주세요.</p>
          <p className="inquire-phone-number">
            <span className="phone-icon">📞</span>
            전화상담: 1544-7000
          </p>
        </div>

        {/* 다음 버튼 */}
        <button
          className={`rating next-button ${
            isNextEnabled ? "enabled" : "disabled"
          }`}
          onClick={isNextEnabled ? onNext : undefined}
          disabled={!isNextEnabled}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default CardCreditRating;
