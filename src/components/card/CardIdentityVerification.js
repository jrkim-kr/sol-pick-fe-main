import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CardIdentityVerification.css";
import { useToast } from "../../context/ToastContext"; // Toast Context 불러오기

const CardIdentityVerificationPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast(); // Toast 함수 가져오기

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    firstName: "",
    residentId: "",
    telecom: "KT",
    phoneNumber: "",
    verificationCode: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showVerificationField, setShowVerificationField] = useState(false);

  // 입력 필드 변경 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 인증 요청 처리
  const handleRequestVerification = () => {
    if (formData.phoneNumber) {
      // 실제로는 여기서 인증 번호를 요청하는 API 호출
      setShowVerificationField(true);
    } else {
      // Toast 메시지로 변경
      showToast("휴대폰 번호를 입력해주세요.");
    }
  };

  // 인증 완료 처리
  const handleCompleteVerification = () => {
    // 모든 필수 필드가 입력되었는지 확인
    const isFormComplete =
      formData.name &&
      formData.lastName &&
      formData.firstName &&
      formData.residentId &&
      formData.residentIdBack &&
      formData.residentIdBack.length === 7 &&
      formData.phoneNumber &&
      formData.verificationCode;

    if (isFormComplete && agreeToTerms) {
      // 영문 성, 이름 저장
      localStorage.setItem("cardLastName", formData.lastName);
      localStorage.setItem("cardFirstName", formData.firstName);
      navigate("/card/apply/terms"); // 다음 단계(약관 동의)로 이동
    } else {
      // Toast 메시지로 변경
      showToast("모든 정보를 입력하고 약관에 동의해주세요.");
    }
  };

  return (
    <div className="identity-verification-container">
      <div className="identity-verification-content">
        {/* 진행 단계 표시 */}
        <div className="step-indicator">
          <div className="active"></div>
          <div className="active"></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <p className="step-number">2 / 6</p>

        {/* 안내 텍스트 */}
        <div className="verification-title">
          <h2>본인 인증해 주세요</h2>
        </div>
        <div className="verification-form">
          {/* 이름 입력 */}
          <div className="input-section">
            <label>이름</label>
            <input
              type="text"
              name="name"
              placeholder="이름 입력"
              value={formData.name}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>

          {/* 영문 성 입력 */}
          <div className="input-section">
            <label>영문 성</label>
            <input
              type="text"
              name="lastName"
              placeholder="EX) HONG"
              value={formData.lastName}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>

          {/* 영문 이름 입력 */}
          <div className="input-section">
            <label>영문 이름</label>
            <input
              type="text"
              name="firstName"
              placeholder="EX) GILDONG"
              value={formData.firstName}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>

          {/* 주민등록번호(외국인등록번호) 입력 */}
          <div className="input-section">
            <label>주민등록번호(외국인등록번호)</label>
            <div className="resident-id-input">
              <input
                type="text"
                name="residentId"
                placeholder="생년월일 6자리"
                maxLength="6"
                value={formData.residentId}
                onChange={handleInputChange}
                className="input-field birth-date"
              />
              <span className="separator">-</span>
              <div className="masked-input">
                <input
                  type="password"
                  name="redidentIdBack"
                  maxLength="7"
                  className="input-field masked"
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({
                      ...formData,
                      residentIdBack: value,
                    });
                  }}
                  value={
                    formData.residentIdBack
                      ? "•".repeat(formData.residentIdBack.length)
                      : ""
                  }
                />
              </div>
            </div>
          </div>

          {/* 휴대폰 인증 */}
          <div className="phone input-section">
            <label>휴대폰 인증</label>
            <div className="telecom-selection">
              <select
                name="telecom"
                value={formData.telecom}
                onChange={handleInputChange}
                className="telecom-select"
              >
                <option value="KT">KT</option>
                <option value="SKT">SKT</option>
                <option value="LGU+">LGU+</option>
                <option value="KT알뜰폰">KT 알뜰폰</option>
                <option value="SKT알뜰폰">SKT 알뜰폰</option>
                <option value="LGU+알뜰폰">SKT 알뜰폰</option>
              </select>
              <svg
                className="dropdown-icon"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path d="M5 8L10 13L15 8" stroke="black" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="phone-verification">
              <input
                type="text"
                name="phoneNumber"
                placeholder="휴대폰 11자리"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="input-field phone-number"
              />
              <button
                className="verification-request-button"
                onClick={handleRequestVerification}
              >
                인증 요청
              </button>
            </div>
          </div>

          {/* 인증 번호 입력 필드 (인증 요청 후 표시) */}
          {showVerificationField && (
            <div className="input-section">
              <input
                type="text"
                name="verificationCode"
                placeholder="인증 번호 입력"
                value={formData.verificationCode}
                onChange={handleInputChange}
                className="input-field verification-code"
              />
            </div>
          )}

          {/* 본인 확인 약관 동의 */}
          <div className="terms-agreement">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
                className="checkbox-input"
              />
              <span className="custom-checkbox"></span>
              <span className="checkbox-label">
                본인 확인을 위한 약관 모두 동의
              </span>
            </label>
          </div>
        </div>
        {/* 하단 버튼 섹션 */}
        <div className="verification-footer">
          <button
            className="verification next-button"
            onClick={handleCompleteVerification}
            disabled={
              !showVerificationField ||
              !formData.verificationCode ||
              !agreeToTerms
            }
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardIdentityVerificationPage;
