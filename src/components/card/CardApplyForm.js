import React, { useState, useEffect } from "react";
import "./CardApplyForm.css";
import AddressSearchModal from "./AddressSearchModal";

const CardApplyForm = ({ onNext }) => {
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    deliveryPlace: "집",
    statementMethod: "신한 SOL페이",
    homeAddress: "",
    homeAddressDetail: "",
    workAddress: "",
    workAddressDetail: "",
    companyName: "",
    department: "",
    workPhone: "",
  });

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressType, setAddressType] = useState(""); // 'home' 또는 'work'
  const [formIsValid, setFormIsValid] = useState(false);

  // 폼 유효성 검사
  useEffect(() => {
    const { deliveryPlace, homeAddress, workAddress, companyName } = formData;

    // 기본 필수 필드 검사
    let isValid = true;

    // 배송지가 '집'인 경우 집 주소 필수
    if (deliveryPlace === "집" && !homeAddress) {
      isValid = false;
    }

    // 배송지가 '직장'인 경우 직장 주소와 직장명 필수
    if (deliveryPlace === "직장" && (!workAddress || !companyName)) {
      isValid = false;
    }

    setFormIsValid(isValid);
  }, [formData]);

  // 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 주소 검색 모달 열기
  const openAddressModal = (type) => {
    setAddressType(type);
    setShowAddressModal(true);
  };

  // 주소 선택 완료 핸들러
  const handleAddressSelect = (address) => {
    if (addressType === "home") {
      setFormData({
        ...formData,
        homeAddress: address,
      });
    } else if (addressType === "work") {
      setFormData({
        ...formData,
        workAddress: address,
      });
    }

    setShowAddressModal(false);
  };

  return (
    <div className="card-apply-form-container">
      <div className="card-apply-form-content">
        {/* 진행 단계 표시 */}
        <div className="step-indicator">
          <div className="active"></div>
          <div className="active"></div>
          <div className="active"></div>
          <div className="active"></div>
          <div className="active"></div>
          <div></div>
        </div>

        <p className="step-number">5 / 6</p>

        <div className="apply page-title">
          <h2>카드 신청 정보를 알려주세요</h2>
        </div>

        {/* 카드 수령 장소 */}
        <div className="apply-form-group">
          <label>카드 받을 곳</label>
          <div className="select-wrapper">
            <select
              name="deliveryPlace"
              value={formData.deliveryPlace}
              onChange={handleInputChange}
            >
              <option value="집">집</option>
              <option value="직장">직장</option>
            </select>
          </div>
        </div>

        {/* 명세서 수령 방법 */}
        <div className="apply-form-group">
          <label>명세서 받는 방법</label>
          <div className="select-wrapper">
            <select
              name="statementMethod"
              value={formData.statementMethod}
              onChange={handleInputChange}
            >
              <option value="신한 SOL페이">신한 SOL페이</option>
              <option value="이메일">이메일</option>
              <option value="우편">우편</option>
            </select>
          </div>
        </div>

        {/* 집 주소 */}
        <div className="apply-form-group">
          <label>집주소</label>
          <div className="address-input-container">
            <div className="address-search-input">
              <input
                type="text"
                className="apply-form-input"
                name="homeAddress"
                value={formData.homeAddress}
                placeholder="주소 검색"
                readOnly
                onClick={() => openAddressModal("home")}
              />
              <svg
                className="search-icon"
                onClick={() => openAddressModal("home")}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 14H14.71L14.43 13.73C15.63 12.33 16.25 10.42 15.91 8.39C15.44 5.61 13.12 3.39 10.32 3.05C6.09 2.53 2.53 6.09 3.05 10.32C3.39 13.12 5.61 15.44 8.39 15.91C10.42 16.25 12.33 15.63 13.73 14.43L14 14.71V15.5L19 20.5L20.5 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                  fill="#777777"
                />
              </svg>
            </div>
            <input
              type="text"
              className="apply-form-input address-detail-input"
              name="homeAddressDetail"
              value={formData.homeAddressDetail}
              onChange={handleInputChange}
              placeholder="상세 주소 입력"
            />
          </div>
        </div>

        {/* 직장 주소 */}
        <div className="apply-form-group">
          <label>직장주소</label>
          <div className="address-input-container">
            <div className="address-search-input">
              <input
                type="text"
                className="apply-form-input"
                name="workAddress"
                value={formData.workAddress}
                placeholder="주소 검색"
                readOnly
                onClick={() => openAddressModal("work")}
              />
              <svg
                className="search-icon"
                onClick={() => openAddressModal("work")}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 14H14.71L14.43 13.73C15.63 12.33 16.25 10.42 15.91 8.39C15.44 5.61 13.12 3.39 10.32 3.05C6.09 2.53 2.53 6.09 3.05 10.32C3.39 13.12 5.61 15.44 8.39 15.91C10.42 16.25 12.33 15.63 13.73 14.43L14 14.71V15.5L19 20.5L20.5 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                  fill="#777777"
                />
              </svg>
            </div>
            <input
              type="text"
              className="apply-form-input address-detail-input"
              name="workAddressDetail"
              value={formData.workAddressDetail}
              onChange={handleInputChange}
              placeholder="상세 주소 입력"
            />
          </div>
        </div>

        {/* 직장 정보 */}
        <div className="apply-form-group">
          <label>직장명</label>
          <input
            type="text"
            className="apply-form-input"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder="직장명 입력"
          />
        </div>

        <div className="apply-form-group">
          <label>부서명(선택)</label>
          <input
            type="text"
            className="apply-form-input"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            placeholder="부서명 입력"
          />
        </div>

        <div className="apply-form-group">
          <label>직장전화(선택)</label>
          <input
            type="text"
            className="apply-form-input"
            name="workPhone"
            value={formData.workPhone}
            onChange={handleInputChange}
            placeholder="'-' 없이 입력"
          />
        </div>

        {/* 다음 버튼 */}

        <button
          className="apply next-button"
          disabled={!formIsValid}
          enabled={formIsValid}
          onClick={onNext}
        >
          다음
        </button>

        {/* 주소 검색 모달 */}
        {showAddressModal && (
          <AddressSearchModal
            onClose={() => setShowAddressModal(false)}
            onSelect={handleAddressSelect}
          />
        )}
      </div>
    </div>
  );
};

export default CardApplyForm;
