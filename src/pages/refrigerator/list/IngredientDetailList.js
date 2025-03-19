import Header from "../../../components/common/header/Header";
import backArrow from "../../../assets/backArrow.svg";
import "./IngredientDetailList.css";
import SelectS from "../../../components/common/select/SelectS";
import SelectSimple from "../../../components/common/select/SelectSimple";
import { useEffect, useState } from "react";
import IngredientListItem from "../../../components/refrigerator/list/IngredientListItem";
import Popup from "../../../components/common/popup/Popup";
import IngredientDetailContent from "../../../components/refrigerator/popup/IngredientDetailContent";
import { ingredientApi } from "../../../api/IngredientApi";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../context/ToastContext";

const IngredientDetailList = () => {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortType, setSortType] = useState("latest");
  const { showToast } = useToast();

  // 카테고리 필터 상태
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [detailCategory, setDetailCategory] = useState("");

  // 선택된 식재료를 저장하기 위한 상태
  const [clickedIngredient, setClickedIngredient] = useState(null);

  // 식재료 상세 팝업 표시 여부를 관리하는 상태
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false);

  // 삭제 확인 팝업 표시 여부를 관리하는 상태
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  // 정렬 옵션
  const orderOptions = [
    { value: "latest", label: "최신순" },
    { value: "oldest", label: "등록순" },
    { value: "expiration", label: "임박순" },
    { value: "name", label: "가나다순" },
  ];

  // 카테고리 데이터
  const mainOptions = [
    { value: "", label: "대분류" },
    { value: "신선식품류", label: "신선식품류" },
    { value: "가공식품류", label: "가공식품류" },
    { value: "조미료·양념류", label: "조미료·양념류" },
    { value: "음료·주류", label: "음료·주류" },
    { value: "유가공·냉장·냉동", label: "유가공·냉장·냉동" },
  ];

  // 카테고리 데이터 구조
  const categoryData = {
    신선식품류: {
      options: [
        { value: "채소·과일·견과류", label: "채소·과일·견과류" },
        { value: "수산·해산·건어물", label: "수산·해산·건어물" },
        { value: "정육·계란", label: "정육·계란" },
      ],
      subCategories: {
        "채소·과일·견과류": [
          { value: "채소류", label: "채소류" },
          { value: "과일류", label: "과일류" },
          { value: "견과류", label: "견과류" },
        ],
        "수산·해산·건어물": [
          { value: "생선류", label: "생선류" },
          { value: "해산물", label: "해산물" },
          { value: "갑각류·조개류", label: "갑각류·조개류" },
          { value: "건어물·해조류", label: "건어물·해조류" },
        ],
        "정육·계란": [
          { value: "소고기", label: "소고기" },
          { value: "돼지고기", label: "돼지고기" },
          { value: "닭고기·오리고기", label: "닭고기·오리고기" },
          { value: "계란", label: "계란" },
        ],
      },
    },

    가공식품류: {
      options: [
        { value: "즉석식품·간편식", label: "즉석식품·간편식" },
        { value: "면·빵·떡", label: "면·빵·떡" },
        { value: "육가공·델리", label: "육가공·델리" },
        { value: "통조림·레토르트", label: "통조림·레토르트" },
      ],
      subCategories: {
        "즉석식품·간편식": [
          { value: "냉동간편식", label: "냉동간편식" },
          { value: "국·탕·찌개", label: "국·탕·찌개" },
        ],
        "면·빵·떡": [
          { value: "국수·면류", label: "국수·면류" },
          { value: "빵·베이커리", label: "빵·베이커리" },
          { value: "떡·한과", label: "떡·한과" },
        ],
        "육가공·델리": [
          { value: "햄·소시지·베이컨", label: "햄·소시지·베이컨" },
          { value: "델리미트", label: "델리미트" },
        ],
        "통조림·레토르트": [
          { value: "통조림", label: "통조림" },
          { value: "절임·피클류", label: "절임·피클류" },
          { value: "즉석밥·죽", label: "즉석밥·죽" },
        ],
      },
    },

    "조미료·양념류": {
      options: [
        { value: "소스·드레싱·양념", label: "소스·드레싱·양념" },
        { value: "장류·식초·기름", label: "장류·식초·기름" },
        { value: "소금·설탕·향신료", label: "소금·설탕·향신료" },
      ],
      subCategories: {
        "소스·드레싱·양념": [
          { value: "소스류", label: "소스류" },
          { value: "드레싱", label: "드레싱" },
          { value: "양념장", label: "양념장" },
        ],
        "장류·식초·기름": [
          { value: "간장·된장·고추장", label: "간장·된장·고추장" },
          { value: "식초", label: "식초" },
          { value: "참기름·들기름", label: "참기름·들기름" },
        ],
        "소금·설탕·향신료": [
          { value: "소금·설탕", label: "소금·설탕" },
          { value: "후추·향신료", label: "후추·향신료" },
        ],
      },
    },

    "음료·주류": {
      options: [
        { value: "생수·탄산수", label: "생수·탄산수" },
        { value: "커피·차·음료", label: "커피·차·음료" },
        { value: "주류·전통주", label: "주류·전통주" },
      ],
      subCategories: {
        "생수·탄산수": [
          { value: "생수", label: "생수" },
          { value: "탄산수", label: "탄산수" },
        ],
        "커피·차·음료": [
          { value: "커피", label: "커피" },
          { value: "차", label: "차" },
          { value: "음료", label: "음료" },
        ],
        "주류·전통주": [
          { value: "맥주", label: "맥주" },
          { value: "소주·청주", label: "소주·청주" },
          { value: "와인·양주", label: "와인·양주" },
        ],
      },
    },

    "유가공·냉장·냉동": {
      options: [
        { value: "유제품·치즈·버터", label: "유제품·치즈·버터" },
        { value: "냉장·냉동식품", label: "냉장·냉동식품" },
      ],
      subCategories: {
        "유제품·치즈·버터": [
          { value: "우유·요거트", label: "우유·요거트" },
          { value: "치즈·버터", label: "치즈·버터" },
        ],
        "냉장·냉동식품": [
          { value: "냉장식품", label: "냉장식품" },
          { value: "냉동식품", label: "냉동식품" },
        ],
      },
    },
  };

  // 식재료 아이템 클릭 핸들러
  const handleIngredientClick = (ingredient) => {
    // 식재료 상세 팝업 열기
    openDetailPopup(ingredient);
  };

  // 식재료 상세를 받도록 팝업 열기
  const openDetailPopup = async (ingredient) => {
    try {
      // 식재료 상세 API 호출
      const response = await ingredientApi.getIngredientDetail(ingredient.id);

      if (response.success) {
        setClickedIngredient(response.data);
        setIsDetailPopupOpen(true);
      } else {
        // 에러 처리
        console.error("식재료 상세 조회 실패:", response.error);
        // 실패하더라도 기본 정보는 표시
        setClickedIngredient(ingredient);
        setIsDetailPopupOpen(true);
      }
    } catch (error) {
      console.error("식재료 상세 조회 중 오류:", error);
      // 에러가 발생해도 기본 정보는 표시
      setClickedIngredient(ingredient);
      setIsDetailPopupOpen(true);
    }
  };

  // 식재료 상세 팝업 닫기
  const closeDetailPopup = () => {
    setIsDetailPopupOpen(false);
  };

  // 식재료 상세 팝업 수정하기 버튼 클릭
  const handleUpdate = () => {
    if (clickedIngredient) {
      navigate(`/refrigerator/update/${clickedIngredient.id}`, {
        state: { ingredient: clickedIngredient },
      });
    }
    closeDetailPopup();
  };

  // 식재료 상세 팝업 삭제하기 버튼 클릭
  const handleDelete = async () => {
    // 상세 팝업 닫기
    closeDetailPopup();
    // 삭제 확인 팝업 열기
    setIsDeletePopupOpen(true);
  };

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

        // 성공 메시지 표시
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

  // 대분류에 따른 중분류 옵션
  const getSubOptions = () => {
    if (!mainCategory || !categoryData[mainCategory]) {
      return [{ value: "", label: "중분류" }];
    }
    return [
      { value: "", label: "중분류" },
      ...categoryData[mainCategory].options,
    ];
  };

  // 중분류에 따른 소분류 옵션
  const getDetailOptions = () => {
    if (
      !mainCategory ||
      !subCategory ||
      !categoryData[mainCategory] ||
      !categoryData[mainCategory].subCategories[subCategory]
    ) {
      return [{ value: "", label: "소분류" }];
    }
    return [
      { value: "", label: "소분류" },
      ...categoryData[mainCategory].subCategories[subCategory],
    ];
  };

  // 식재료 목록 불러오기
  const fetchIngredients = async () => {
    setLoading(true);
    try {
      let response;

      // 카테고리 필터가 있으면 카테고리별 조회 API 호출
      if (mainCategory || subCategory || detailCategory) {
        response = await ingredientApi.getIngredientsByCategories(
          mainCategory,
          subCategory,
          detailCategory,
          sortType
        );
      } else {
        // 필터 없으면 전체 목록 조회
        response = await ingredientApi.getIngredientList(sortType);
      }

      if (response.success) {
        setIngredients(response.data);
      } else {
        setError(response.error || "식재료 목록을 불러오는데 실패했습니다.");
      }
    } catch (error) {
      setError("서버 연결에 실패했습니다.");
      console.error("식재료 목록 조회 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // 정렬 방식이나 카테고리 필터 변경 시 데이터 다시 불러오기
  useEffect(() => {
    fetchIngredients();
  }, [sortType, mainCategory, subCategory, detailCategory]);

  // 정렬 옵션 변경 핸들러
  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  // 대분류 변경 시 중분류, 소분류 초기화
  const handleMainCategoryChange = (e) => {
    setMainCategory(e.target.value);
    setSubCategory("");
    setDetailCategory("");
  };

  // 중분류 변경 시 소분류 초기화
  const handleSubCategoryChange = (e) => {
    setSubCategory(e.target.value);
    setDetailCategory("");
  };

  // 소분류 변경
  const handleDetailCategoryChange = (e) => {
    setDetailCategory(e.target.value);
  };

  // 날짜와 시간 포맷팅 함수
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    // 년, 월, 일 포맷팅 (YYYY. MM. DD.)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    // 시간 포맷팅 (HH:MM)
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
  };

  return (
    <>
      <Header
        leftIcon={backArrow}
        title="나의 냉장고 목록"
        onLeftClick={() => window.history.back()}
      />

      {/* 정렬 옵션 */}
      <div className="order-select-container">
        <SelectSimple
          options={orderOptions}
          value={sortType}
          onChange={handleSortChange}
        />
      </div>

      {/* 카테고리 */}
      <div className="category-select-container">
        <SelectS
          options={mainOptions}
          value={mainCategory}
          onChange={handleMainCategoryChange}
        />
        <SelectS
          options={getSubOptions()}
          value={subCategory}
          onChange={handleSubCategoryChange}
          disabled={!mainCategory}
        />
        <SelectS
          options={getDetailOptions()}
          value={detailCategory}
          onChange={handleDetailCategoryChange}
          disabled={!subCategory}
        />
      </div>

      {loading ? (
        <div className="list-loading">식재료 목록을 불러오는 중...</div>
      ) : error ? (
        <div className="list-error">{error}</div>
      ) : ingredients.length === 0 ? (
        <div className="list-empty">등록된 식재료가 없습니다.</div>
      ) : (
        <div className="ingredient-list-container">
          {ingredients.map((ingredient) => (
            <IngredientListItem
              key={ingredient.id}
              image={ingredient.image}
              category={ingredient.detailCategory || ingredient.mainCategory}
              name={ingredient.name}
              addDate={formatDateTime(ingredient.createdAt)}
              onClick={() => handleIngredientClick(ingredient)}
            />
          ))}
        </div>
      )}

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
    </>
  );
};
export default IngredientDetailList;
