import React, { useState, useRef, useEffect } from "react";
import "./AddressSearchModal.css";

const AddressSearchModal = ({ onClose, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef(null);

  // 모달이 열리면 입력 필드에 포커스
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // 주소 검색 함수
  const searchAddress = async () => {
    if (!searchQuery.trim()) {
      setErrorMessage("검색어를 입력해주세요.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      // 실제 구현에서는 Kakao 주소 검색 API 또는 다른 주소 검색 API를 사용할 수 있습니다.
      // 여기서는 예시 데이터를 사용합니다.

      // 예시 데이터 (실제 구현에서는 API 호출 결과를 사용)
      const mockResults = [
        {
          id: 1,
          type: "도로명",
          mainAddress: "서울 마포구 월드컵북로4길 77",
          subAddress: "(동교동)",
          zipCode: "03993",
        },
        {
          id: 2,
          type: "지번",
          mainAddress: "서울 마포구 동교동 197-8",
          subAddress: "",
          zipCode: "03993",
        },
        {
          id: 3,
          type: "도로명",
          mainAddress: "서울 마포구 동교로27길 21 1층",
          subAddress: "",
          zipCode: "03993",
        },
        {
          id: 4,
          type: "지번",
          mainAddress: "서울 마포구 동교동 204-22",
          subAddress: "",
          zipCode: "03993",
        },
        {
          id: 5,
          type: "도로명",
          mainAddress: "서울 마포구 동교로46길 3",
          subAddress: "",
          zipCode: "03982",
        },
        {
          id: 6,
          type: "지번",
          mainAddress: "서울 마포구 연남동 228-25",
          subAddress: "",
          zipCode: "03982",
        },
        {
          id: 7,
          type: "도로명",
          mainAddress: "서울 마포구 동교로30길 17 1층",
          subAddress: "",
          zipCode: "03985",
        },
        {
          id: 8,
          type: "지번",
          mainAddress: "서울 마포구 동교동 149-13",
          subAddress: "",
          zipCode: "03982",
        },
      ];

      // 검색어에 따라 결과 필터링 (실제 API에서는 필요 없음)
      const filteredResults = mockResults.filter(
        (addr) =>
          addr.mainAddress.includes(searchQuery) ||
          addr.subAddress.includes(searchQuery)
      );

      setTimeout(() => {
        setSearchResults(filteredResults);
        setLoading(false);

        if (filteredResults.length === 0) {
          setErrorMessage("검색 결과가 없습니다. 다시 시도해주세요.");
        }
      }, 500); // 로딩 효과를 위한 지연
    } catch (error) {
      console.error("주소 검색 중 오류 발생:", error);
      setErrorMessage("주소 검색 중 오류가 발생했습니다. 다시 시도해주세요.");
      setLoading(false);
    }
  };

  // 주소 선택 함수
  const handleAddressClick = (address) => {
    setSelectedAddress(address);
  };

  // 선택한 주소 사용 함수
  const handleUseAddress = () => {
    if (selectedAddress) {
      // 선택한 주소를 포맷팅하여 부모 컴포넌트로 전달
      const formattedAddress =
        `${selectedAddress.mainAddress} ${selectedAddress.subAddress}`.trim();
      onSelect(formattedAddress);
    }
  };

  // 엔터 키 처리
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchAddress();
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="address-search-modal">
        {/* 모달 헤더 */}
        <div className="modal-header">
          <h2 className="modal-title">주소 찾기</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        {/* 검색 입력 */}
        <div className="search-box">
          <div className="search-input-container">
            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder="주소"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="search-button" onClick={searchAddress}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 14H14.71L14.43 13.73C15.63 12.33 16.25 10.42 15.91 8.39C15.44 5.61 13.12 3.39 10.32 3.05C6.09 2.53 2.53 6.09 3.05 10.32C3.39 13.12 5.61 15.44 8.39 15.91C10.42 16.25 12.33 15.63 13.73 14.43L14 14.71V15.5L19 20.5L20.5 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                  fill="#777777"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 검색 가이드 메시지 */}
        {!searchResults.length && !loading && !errorMessage && (
          <div className="search-guide">
            <p>이렇게 검색해보세요.</p>
            <p>도로명 + 건물번호 예) 송파대로 570</p>
            <p>도로명 예) 신길로</p>
            <p>건물명 예) 강남우체국</p>
          </div>
        )}

        {/* 에러 메시지 */}
        {errorMessage && (
          <div className="search-guide">
            <p>{errorMessage}</p>
          </div>
        )}

        {/* 로딩 표시 */}
        {loading && (
          <div className="search-guide">
            <p>검색 중...</p>
          </div>
        )}

        {/* 검색 결과 */}
        <div className="search-results">
          {searchResults.map((address) => (
            <div
              key={address.id}
              className={`address-item ${
                selectedAddress && selectedAddress.id === address.id
                  ? "selected"
                  : ""
              }`}
              onClick={() => handleAddressClick(address)}
            >
              <span className="address-type">{address.type}</span>
              <span>{address.zipCode}</span>
              <div className="address-text">{address.mainAddress}</div>
              {address.subAddress && (
                <div className="sub-address">{address.subAddress}</div>
              )}
            </div>
          ))}
        </div>

        {/* 버튼 영역 */}
        {searchResults.length > 0 && (
          <div className="button-container">
            <button
              className="search-again-button"
              onClick={() => {
                setSearchResults([]);
                setSelectedAddress(null);
                setSearchQuery("");
                if (inputRef.current) inputRef.current.focus();
              }}
            >
              다시 찾기
            </button>
            <button
              className="use-address-button"
              disabled={!selectedAddress}
              onClick={handleUseAddress}
            >
              이 주소로 선택할게요
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressSearchModal;
