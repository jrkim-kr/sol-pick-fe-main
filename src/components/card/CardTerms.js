import React, { useState } from "react";
import "./CardTerms.css";
import detailArrow from "../../assets/detailArrow.svg";

const CardTerms = ({ onNext }) => {
  // 약관 동의 상태 관리
  const [allAgreed, setAllAgreed] = useState(false);
  const [agreements, setAgreements] = useState({
    allTerms: false,
    personalInfo: false,
    termsOfService: false,
    financialInfo: false,
    membershipBenefits: false,
    personalInfoOptional: false,
    cardUsageService: false,
    cardIssuancePersonalInfo: false,
    creditCardUsagePersonalInfo: false,
  });

  // 모든 약관 동의 토글
  const handleAllAgreement = () => {
    const newValue = !agreements.allTerms;

    setAgreements({
      ...agreements,
      allTerms: newValue,
      personalInfo: newValue,
      termsOfService: newValue,
      financialInfo: newValue,
      membershipBenefits: newValue,
      personalInfoOptional: newValue,
      cardUsageService: newValue,
      cardIssuancePersonalInfo: newValue,
      creditCardUsagePersonalInfo: newValue,
    });

    setAllAgreed(newValue);
  };

  // 개별 약관 동의 토글
  const handleAgreementChange = (key) => {
    const newAgreements = {
      ...agreements,
      [key]: !agreements[key],
    };

    setAgreements(newAgreements);

    const requiredAgreements = [
      "personalInfo",
      "termsOfService",
      "financialInfo",
      "membershipBenefits",
    ];

    const allRequiredChecked = requiredAgreements.every(
      (k) => newAgreements[k]
    );

    // 모든 약관이 동의되었는지 확인
    const allChecked = Object.keys(newAgreements)
      .filter((k) => k !== "allTerms") // "allTerms" 키를 제외한 나머지 키만 필터링
      .every((k) => newAgreements[k]); // 모두가 true이어야 every 함수의 결과도 true될 것임

    setAgreements({
      ...newAgreements,
      allTerms: allChecked,
    });

    // 필수 약관만 모두 체크되어도 다음 버튼 활성화
    setAllAgreed(allRequiredChecked);
  };

  return (
    <div className="card-terms-container">
      <div className="card-terms-content">
        {/* 진행 단계 표시 */}
        <div className="step-indicator">
          <div className="active"></div>
          <div className="active"></div>
          <div className="active"></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <p className="step-number">3 / 6</p>
        <div className="terms page-title">
          <h2>카드를 만들려면 약관 동의가 필요해요</h2>
        </div>

        {/* 모두 동의 */}
        <div className="agreement-section all-agreement">
          <label className="section-header">
            <input
              type="checkbox"
              checked={agreements.allTerms}
              onChange={handleAllAgreement}
            />
            <span className="checkmark"></span>
            <span className="agreement-text">모두 동의</span>
          </label>
        </div>

        {/* 개인(신용)정보 필수적 동의 섹션 */}
        <div className="agreement-section">
          <div className="section-header">
            <input
              type="checkbox"
              checked={agreements.personalInfo}
              onChange={() => handleAgreementChange("personalInfo")}
            />
            <span className="checkmark"></span>
            <span className="agreement-text">
              개인(신용)정보 필수적 동의(필수)
            </span>
            <img
              src={detailArrow}
              alt="Arrow"
              className="terms dropdown-arrow"
            />
          </div>
        </div>

        {/* 약관 동의 섹션 */}
        <div className="agreement-section">
          <div className="section-header">
            <input
              type="checkbox"
              checked={agreements.termsOfService}
              onChange={() => handleAgreementChange("termsOfService")}
            />
            <span className="checkmark"></span>
            <span className="agreement-text">
              약관 동의 관한 필수적 동의(필수)
            </span>
            <img
              src={detailArrow}
              alt="Arrow"
              className="terms dropdown-arrow"
            />
          </div>
        </div>

        {/* 발급심사 관련 동의 */}
        <div className="agreement-section">
          <div className="section-header">
            <input
              type="checkbox"
              checked={agreements.financialInfo}
              onChange={() => handleAgreementChange("financialInfo")}
            />
            <span className="checkmark"></span>
            <span className="agreement-text">
              발급심사 관련 동의에 관한 동의(필수)
            </span>
            <img
              src={detailArrow}
              alt="Arrow"
              className="terms dropdown-arrow"
            />
          </div>
        </div>

        {/* 회원 가입 및 발급 신청에 관한 필수적 동의 */}
        <div className="agreement-section">
          <div className="section-header">
            <input
              type="checkbox"
              checked={agreements.membershipBenefits}
              onChange={() => handleAgreementChange("membershipBenefits")}
            />
            <span className="checkmark"></span>
            <span className="agreement-text">
              회원가입 및 발급신청에 관한 필수적 동의(필수)
            </span>
            <img
              src={detailArrow}
              alt="Arrow"
              className="terms dropdown-arrow"
            />
          </div>
        </div>

        {/* 개인(신용)정보 동의(선택) 섹션 */}
        <div className="agreement-section">
          <div className="section-header">
            <input
              type="checkbox"
              checked={agreements.personalInfoOptional}
              onChange={() => handleAgreementChange("personalInfoOptional")}
            />
            <span className="checkmark"></span>
            <span className="agreement-text">개인(신용)정보 동의(선택)</span>
            <img
              src={detailArrow}
              alt="Arrow"
              className="terms dropdown-arrow"
            />
          </div>
        </div>

        {/* 카드발급 관련 개인(신용)정보 동의(선택) */}
        <div className="agreement-section">
          <div className="section-header">
            <input
              type="checkbox"
              checked={agreements.cardIssuancePersonalInfo}
              onChange={() => handleAgreementChange("cardIssuancePersonalInfo")}
            />
            <span className="checkmark"></span>
            <span className="agreement-text">
              카드발급 관련 개인(신용)정보 동의(선택)
            </span>
            <img
              src={detailArrow}
              alt="Arrow"
              className="terms dropdown-arrow"
            />
          </div>
        </div>

        {/* 신용평가기관 정보활용 */}
        <div className="agreement-section last">
          <div className="section-header">
            <input
              type="checkbox"
              checked={agreements.creditCardUsagePersonalInfo}
              onChange={() =>
                handleAgreementChange("creditCardUsagePersonalInfo")
              }
            />
            <span className="checkmark"></span>
            <span className="agreement-text">
              신용평가기관 정보활용 신성정보 저동인력(선택)
            </span>
            <img
              src={detailArrow}
              alt="Arrow"
              className="terms dropdown-arrow"
            />
          </div>
        </div>

        <button
          className={`terms next-button ${allAgreed ? "active" : ""}`}
          onClick={onNext}
          disabled={!allAgreed}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default CardTerms;
