import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RefrigeratorHeader from "../../../components/refrigerator/main/RefrigeratorHeader";
import Menu from "../../../components/common/menu/Menu";
import AddPopup from "../../../components/refrigerator/popup/AddPopup";
import Popup from "../../../components/common/popup/Popup";
import IngredientDetailContent from "../../../components/refrigerator/popup/IngredientDetailContent";
import refrigeratorIllust from "../../../assets/refrigeratorIllust.svg";
import "./Refrigerator.css";
import { getIngredientImageFromEmoji } from "../../../utils/emojiToImageMap";
import MainHeader from "../../../components/common/header/MainHeader";
import recipe from "../../../assets/recipe.svg";
import { ingredientApi } from "../../../api/IngredientApi";
import { useToast } from "../../../context/ToastContext";

const Refrigerator = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false);
  const [clickedIngredient, setClickedIngredient] = useState(null);
  // 마우스 이벤트
  const [mouseDown, setMouseDown] = useState(false);
  // 터치(스와이프) 이벤트
  const [touchStart, setTouchStart] = useState(null);
  const { showToast } = useToast();

  // 터치/마우스 이벤트 핸들러
  const handleSwipeStart = (clientX, e) => {
    // 기본 스크롤 동작 방지
    e.preventDefault();
    setTouchStart(clientX);
    setMouseDown(true);
  };

  const handleSwipeMove = (clientX, e) => {
    // 기본 스크롤 동작 방지
    e.preventDefault();

    if (!mouseDown || touchStart === null) return;

    const distance = touchStart - clientX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentPage < allIngredients.length - 1) {
      setCurrentPage(currentPage + 1);
      setTouchStart(null);
      setMouseDown(false);
    } else if (isRightSwipe && currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setTouchStart(null);
      setMouseDown(false);
    }
  };

  const handleSwipeEnd = (e) => {
    // 기본 스크롤 동작 방지
    e.preventDefault();

    setTouchStart(null);
    setMouseDown(false);
  };

  // 식재료 로딩 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 실제 식재료 데이터
  const [allIngredients, setAllIngredients] = useState([[]]);

  // 한 냉장고에 표시할 최대 식재료 수
  const MAX_INGREDIENTS_PER_REFRIGERATOR = 15;

  // 식재료 데이터 가져오기
  useEffect(() => {
    fetchIngredients();
  }, []);

  // 식재료 목록 불러오기 (최신순)
  const fetchIngredients = async () => {
    setLoading(true);
    try {
      // 최신순으로 식재료 목록 가져오기
      const response = await ingredientApi.getIngredientList("latest");

      if (response.success) {
        // 받아온 데이터를 냉장고 형식으로 변환
        const formattedIngredients = convertToRefrigeratorFormat(response.data);
        setAllIngredients(formattedIngredients);
      } else {
        setError(response.error || "식재료 목록을 불러오는데 실패했습니다.");
        showToast("식재료 목록을 불러오는데 실패했습니다.");

        // 빈 냉장고 배열 설정 (에러 상태에서도 냉장고는 표시)
        setAllIngredients([[]]);
      }
    } catch (error) {
      console.error("식재료 목록 조회 오류:", error);
      setError("서버 연결에 실패했습니다.");
      showToast("서버 연결에 실패했습니다.");

      // 빈 냉장고 배열 설정 (에러 상태에서도 냉장고는 표시)
      setAllIngredients([[]]);
    } finally {
      setLoading(false);
    }
  };

  // API에서 받아온 데이터를 냉장고 디스플레이 형식으로 변환
  const convertToRefrigeratorFormat = (data) => {
    // 식재료가 없는 경우 빈 배열의 배열 반환 (비어있는 냉장고 1개)
    if (!data || data.length === 0) {
      return [[]];
    }

    // 식재료 데이터 가공
    const formattedData = data.map((ingredient, index) => ({
      id: ingredient.id,
      name: ingredient.name,
      emoji: ingredient.emoji || "🍎", // 기본 이모지
      image: getIngredientImageFromEmoji(ingredient.emoji || "🍎"), // 이모지 기반 매핑된 이미지 (냉장고 메인용)
      originalImage: ingredient.image, // DB에 저장된 이미지 (상세 팝업 및 상세 목록용)
      size: 50, // 고정 크기
      x: calculateXPosition(index % 3), // x 위치 계산
      // 추가 속성들 (상세 팝업용)
      expiryDate: ingredient.expiryDate,
      quantity: ingredient.quantity,
      mainCategory: ingredient.mainCategory,
      subCategory: ingredient.subCategory,
      detailCategory: ingredient.detailCategory,
      createdAt: ingredient.createdAt,
      updatedAt: ingredient.updatedAt,
    }));

    // 냉장고 페이지 개수 계산
    const totalPages = Math.ceil(
      formattedData.length / MAX_INGREDIENTS_PER_REFRIGERATOR
    );

    // 냉장고 페이지별로 식재료 분배
    const refrigerators = [];
    for (let i = 0; i < totalPages; i++) {
      const startIndex = i * MAX_INGREDIENTS_PER_REFRIGERATOR;
      const endIndex = startIndex + MAX_INGREDIENTS_PER_REFRIGERATOR;
      refrigerators.push(formattedData.slice(startIndex, endIndex));
    }

    // 최소 하나의 냉장고 페이지가 있도록 보장
    if (refrigerators.length === 0) {
      refrigerators.push([]);
    }

    return refrigerators;
  };

  // x 좌표 계산 함수 (3개의 열에 맞춰 배치)
  const calculateXPosition = (columnIndex) => {
    const positions = [69, 137, 205]; // 왼쪽, 중간, 오른쪽 위치
    return positions[columnIndex];
  };

  // 식재료 등록 팝업
  const openAddPopup = () => {
    setIsAddPopupOpen(true);
  };

  const closeAddPopup = () => {
    setIsAddPopupOpen(false);
  };

  // 식재료 상세 팝업
  const openDetailPopup = async (ingredient) => {
    try {
      // 식재료 상세 API 호출
      const response = await ingredientApi.getIngredientDetail(ingredient.id);

      if (response.success) {
        setClickedIngredient(response.data);
      } else {
        // API 호출 실패시 현재 가지고 있는 정보로 표시
        setClickedIngredient(ingredient);
        console.error("식재료 상세 조회 실패:", response.error);
      }
    } catch (error) {
      console.error("식재료 상세 조회 중 오류:", error);
      // 오류 발생시 현재 가지고 있는 정보로 표시
      setClickedIngredient(ingredient);
    }

    setIsDetailPopupOpen(true);
  };

  const closeDetailPopup = () => {
    setIsDetailPopupOpen(false);
  };

  // 식재료 수정하기 버튼 클릭
  const handleUpdate = () => {
    if (clickedIngredient) {
      navigate(`/refrigerator/update/${clickedIngredient.id}`, {
        state: { ingredient: clickedIngredient },
      });
    }
    closeDetailPopup();
  };

  // 식재료 삭제하기 버튼 클릭
  const handleDelete = () => {
    // 상세 팝업 닫기
    closeDetailPopup();
    // 삭제 확인 팝업 열기
    setIsDeletePopupOpen(true);
  };

  // 삭제 확인 팝업 표시 여부를 관리하는 상태
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  // 삭제 확인 팝업 닫기
  const closeDeletePopup = () => {
    setIsDeletePopupOpen(false);
  };

  // 삭제 확인 팝업 삭제하기 버튼 클릭
  const confirmDelete = async () => {
    if (!clickedIngredient) return;

    try {
      const response = await ingredientApi.deleteIngredient(
        clickedIngredient.id
      );

      if (response.success) {
        // 목록 갱신
        fetchIngredients();

        // 삭제 확인 팝업 닫기
        closeDeletePopup();

        // 삭제된 식재료 참조 초기화
        setClickedIngredient(null);

        // 토스트 메시지 표시
        showToast("식재료가 삭제되었습니다.");
      } else {
        // 삭제 실패 처리
        console.error("식재료 삭제 실패:", response.error);

        // 실패 메시지 표시
        showToast(response.error || "삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("식재료 삭제 중 오류:", error);

      // 오류 메시지 표시
      showToast("서버 연결에 실패했습니다.");
    }
  };

  // 전체 식재료 수 계산
  const totalIngredients = allIngredients.reduce(
    (total, refrigerator) => total + refrigerator.length,
    0
  );

  // 페이지 변경 핸들러
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  // 선반 위치 계산
  const shelfPositions = [113, 213, 313, 413, 513];
  const ingredientPositions = shelfPositions.map((pos) => pos - 58); // 높이 50px + 8px 간격

  // 선반별로 식재료 그룹화
  const groupIngredientsByShelf = (refrigeratorIngredients) => {
    const shelves = [[], [], [], [], []];

    refrigeratorIngredients.forEach((ingredient, index) => {
      // 인덱스 기반으로 선반 결정 (5개 선반에 고르게 배치)
      let shelfIndex = Math.floor(index / 3);

      // 선반 인덱스가 범위 내에 있는지 확인
      if (shelfIndex >= 0 && shelfIndex < 5) {
        shelves[shelfIndex].push(ingredient);
      }
    });

    return shelves;
  };

  return (
    <div className="refrigerator-main-container">
      <MainHeader />

      <RefrigeratorHeader
        totalIngredients={totalIngredients}
        onAddClick={openAddPopup}
        onDetailClick={() => navigate("/refrigerator/list")}
      />

      <div
        className="refrigerator-container"
        // 터치 이벤트
        onTouchStart={(e) => handleSwipeStart(e.targetTouches[0].clientX, e)}
        onTouchMove={(e) => handleSwipeMove(e.targetTouches[0].clientX, e)}
        onTouchEnd={(e) => handleSwipeEnd(e)}
        // 마우스 이벤트
        onMouseDown={(e) => handleSwipeStart(e.clientX, e)}
        onMouseMove={(e) => {
          if (mouseDown) handleSwipeMove(e.clientX, e);
        }}
        onMouseUp={(e) => handleSwipeEnd(e)}
        onMouseLeave={(e) => handleSwipeEnd(e)}
      >
        <div
          className="refrigerator-carousel"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {allIngredients.map((refrigeratorIngredients, refrigeratorIndex) => (
            <div
              key={`refrigerator-${refrigeratorIndex}`}
              className="refrigerator-slide"
            >
              <div className="refrigerator-with-ingredients">
                {/* 냉장고 SVG (항상 표시) */}
                <img
                  src={refrigeratorIllust}
                  alt="refrigeratorIllust"
                  className="refrigerator-svg"
                />

                {/* 냉장고 위에 오버레이 */}
                {loading ? (
                  <div className="refrigerator-status-overlay">
                    <div className="refrigerator-status-message">
                      식재료 목록을 불러오는 중...
                    </div>
                  </div>
                ) : error ? (
                  <div className="refrigerator-status-overlay">
                    <div className="refrigerator-status-message">{error}</div>
                  </div>
                ) : refrigeratorIngredients.length === 0 ? (
                  <div className="refrigerator-status-overlay">
                    <div className="refrigerator-status-message">
                      등록된 식재료가 없습니다.
                    </div>
                  </div>
                ) : (
                  /* 선반 위 식재료들 */
                  groupIngredientsByShelf(refrigeratorIngredients).map(
                    (shelfIngredients, shelfIndex) => (
                      <div
                        key={`shelf-${refrigeratorIndex}-${shelfIndex}`}
                        className="ingredients-shelf"
                        style={{
                          position: "absolute",
                          top: `${ingredientPositions[shelfIndex]}px`,
                        }}
                      >
                        {shelfIngredients.map((ingredient) => (
                          <div
                            key={`ingredient-${ingredient.id}`}
                            className="ingredient-item"
                            onClick={() => openDetailPopup(ingredient)}
                            style={{
                              position: "absolute",
                              left: `${ingredient.x}px`,
                              width: `${ingredient.size}px`,
                              height: `${ingredient.size}px`,
                              cursor: "pointer",
                            }}
                          >
                            <img
                              src={ingredient.image}
                              alt={ingredient.name}
                              className="ingredient-image"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 인디케이터 */}
      <div className="refrigerator-indicators">
        {allIngredients.map((_, index) => (
          <div
            key={`indicator-${index}`}
            className={`refrigerator-indicator ${
              index === currentPage ? "active" : ""
            }`}
            onClick={() => handlePageChange(index)}
          />
        ))}
      </div>

      {/* 레시피 추천 페이지 이동 버튼 */}
      <div
        className="recipe-recommend-button recipe-recommend-button-pulse"
        onClick={() => navigate("/recipe-loading")}
      >
        <img src={recipe} alt="recipe" className="recipe-recommend-icon" />
      </div>

      {/* 식재료 추가 팝업 */}
      <AddPopup isOpen={isAddPopupOpen} onClose={closeAddPopup} />

      {/* 식재료 상세 팝업 */}
      <Popup
        isOpen={isDetailPopupOpen}
        onClose={closeDetailPopup}
        onLeftClick={handleUpdate} // 수정하기
        onRightClick={handleDelete} // 삭제하기
        title={clickedIngredient ? clickedIngredient.name : "식재료명"}
        outlinedButtonText="수정하기"
        filledButtonText="삭제하기"
      >
        <IngredientDetailContent ingredient={clickedIngredient} />
      </Popup>

      {/* 삭제 확인 팝업 */}
      <Popup
        isOpen={isDeletePopupOpen}
        onClose={closeDeletePopup}
        onLeftClick={closeDeletePopup} // 취소
        onRightClick={confirmDelete} // 삭제하기
        title={
          clickedIngredient ? `${clickedIngredient.name} 삭제` : "식재료 삭제"
        }
        description={`이 식재료를 정말 삭제하시겠습니까?\n해당 식재료의 모든 정보가 영구적으로 삭제되며,\n삭제된 식재료는 복구할 수 없습니다.`}
        outlinedButtonText="취소"
        filledButtonText="삭제하기"
      />
      <Menu />
    </div>
  );
};

export default Refrigerator;
