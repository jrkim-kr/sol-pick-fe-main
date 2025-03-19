import React, { useState } from "react";
import "./CardDetail.css";

import detailArrow from "../../assets/detailArrow.svg";
import BasicDesignFront from "../../assets/card/basicDesign.svg";

const CardDetail = ({ cardData, onNext }) => {
  const { cardName, cardSubName, benefits } = cardData;

  // 드롭다운 열림/닫힘 상태 관리
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 드롭다운 토글 함수
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="card-detail-container">
      <div className="card-detail-content">
        {/* 카드 이미지 */}
        <div className="card-visual-section">
          <div className="card-image-container">
            <div className="detail-card-image">
              <img
                src={BasicDesignFront}
                alt="Basic Design Front"
                className="basic-design-front"
              />
            </div>
          </div>

          {/* 카드 이름 섹션 */}
          <div className="card-title-section">
            <h2>{cardName}</h2>
            <h2>{cardSubName}</h2>
            <div className="divider"></div>
          </div>
        </div>

        {/* 혜택 정보 섹션 */}
        <div className="card-benefits-section">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-item">
              <p>
                <a className="benefit1 benefit-category">
                  {benefit.benefitTitle1}
                </a>
                <a className="benefit1 benefit-detail">
                  {benefit.benefitDetail1}
                </a>
              </p>
              <p>
                <a className="benefit2 benefit-category">
                  {benefit.benefitTitle2}
                </a>
                <a className="benefit2 benefit-detail">
                  {benefit.benefitDetail2}
                </a>
              </p>
              <p>
                <a className="benefit3 benefit-category">
                  {benefit.benefitTitle3}
                </a>
                <a className="benefit3 benefit-detail">
                  {benefit.benefitDetail3}
                </a>
              </p>
            </div>
          ))}
        </div>

        {/* 연회비 섹션 */}
        <div className="annual-fee-section">
          <div className="view-more-button">
            <span>연회비</span>
            <img
              src={detailArrow}
              alt="View Details"
              className="detail-arrow"
            />
          </div>
          <div className="brand-section">
            <div className="brand-label">
              <span class="ico_brand">
                <svg
                  width="44"
                  height="23"
                  viewBox="0 0 84 58"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M37.2957 39.7782H31.7032L35.2011 19.4772H40.7933L37.2957 39.7782Z"
                    fill="#15195A"
                  />
                  <path
                    d="M57.5686 19.9735C56.4655 19.5627 54.7159 19.1092 52.5525 19.1092C47.0298 19.1092 43.1407 21.8734 43.1168 25.8255C43.0709 28.7413 45.9013 30.3608 48.0182 31.333C50.1818 32.3265 50.9173 32.9749 50.9173 33.8605C50.8953 35.2205 49.169 35.8474 47.5588 35.8474C45.3261 35.8474 44.1297 35.5242 42.3116 34.7675L41.5752 34.4432L40.7926 39.0003C42.1043 39.5612 44.5208 40.0589 47.0298 40.0808C52.8978 40.0808 56.7181 37.3593 56.7633 33.1477C56.7857 30.8367 55.2911 29.066 52.069 27.619C50.113 26.6901 48.9151 26.0637 48.9151 25.1133C48.9381 24.2493 49.9283 23.3644 52.1363 23.3644C53.9544 23.321 55.2902 23.7312 56.3022 24.1417L56.808 24.3573L57.5686 19.9735Z"
                    fill="#15195A"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M67.5793 19.4772H71.9051L76.4168 39.7779H71.2387C71.2387 39.7779 70.732 37.4454 70.5714 36.7326H63.3911C63.1835 37.2723 62.2174 39.7779 62.2174 39.7779H56.3494L64.6563 21.1616C65.2319 19.844 66.2453 19.4772 67.5793 19.4772ZM67.2348 26.9062C67.2348 26.9062 65.4625 31.42 65.002 32.5863H69.6504C69.4204 31.5713 68.3614 26.7119 68.3614 26.7119L67.9706 24.9626C67.806 25.4131 67.568 26.0324 67.4074 26.4501C67.2986 26.7332 67.2254 26.9237 67.2348 26.9062Z"
                    fill="#15195A"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.47169 19.4772H16.4695C17.6891 19.5199 18.6787 19.8871 19.0007 21.1837L20.956 30.5102C20.9563 30.5111 20.9566 30.512 20.9568 30.5129L21.5553 33.3205L27.0322 19.4772H32.9458L24.1554 39.7567H18.2415L13.2569 22.1169C11.5371 21.1732 9.57422 20.4141 7.37964 19.8874L7.47169 19.4772Z"
                    fill="#15195A"
                  />
                </svg>
              </span>
              <span>1만5천원(일반)</span>
            </div>
            <div className="brand-label">
              <span class="ico_brand">
                <svg
                  width="44"
                  height="23"
                  viewBox="0 0 84 58"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M49.6906 42.0159H34.6994V15.2427H49.6906V42.0159Z"
                    fill="#FF5F00"
                  />
                  <path
                    d="M35.6598 28.6272C35.6598 23.1961 38.2187 18.3583 42.2036 15.2406C39.2896 12.9607 35.6119 11.6 31.615 11.6C22.1529 11.6 14.4828 19.2232 14.4828 28.6272C14.4828 38.0311 22.1529 45.6543 31.615 45.6543C35.6119 45.6543 39.2896 44.2936 42.2036 42.0138C38.2187 38.8961 35.6598 34.0582 35.6598 28.6272Z"
                    fill="#EB001B"
                  />
                  <path
                    d="M69.9092 28.6272C69.9092 38.0311 62.239 45.6543 52.7769 45.6543C48.7801 45.6543 45.1024 44.2936 42.1873 42.0138C46.1732 38.8961 48.7321 34.0582 48.7321 28.6272C48.7321 23.1961 46.1732 18.3583 42.1873 15.2406C45.1024 12.9607 48.7801 11.6 52.7769 11.6C62.239 11.6 69.9092 19.2232 69.9092 28.6272Z"
                    fill="#F79E1B"
                  />
                </svg>
              </span>
              <span>1만5천원(일반)</span>
            </div>
          </div>
        </div>

        {/* 카드발급 유의사항 드롭다운 */}
        <div className="card-info-dropdown-section">
          <div className="dropdown-header" onClick={toggleDropdown}>
            <span>카드발급 유의사항</span>
            <img
              src={detailArrow}
              alt="Arrow"
              className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}
            />
          </div>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <p>
                카드 이용 시 제공되는 포인트 및 할인 혜택 등의 부가서비스는 카드
                신규출시(2024.04.02) 이후 3년 이상 축소·폐지 없이 유지됩니다.
              </p>
            </div>
          )}
        </div>
      </div>

      <button className="apply-button" onClick={onNext}>
        카드 신청
      </button>
    </div>
  );
};

export default CardDetail;
