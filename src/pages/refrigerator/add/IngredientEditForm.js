import "./IngredientAddForm.css";
import Header from "../../../components/common/header/Header";
// import backArrow from "../../../assets/backArrow.svg";
import close from "../../../assets/close.svg";
import Input from "../../../components/common/input/Input";
import SelectL from "../../../components/common/select/SelectL";
import ButtonL from "../../../components/common/button/ButtonL";
import Menu from "../../../components/common/menu/Menu";
import plus from "../../../assets/plus.svg";
import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SelectIcon from "../../../components/refrigerator/add/SelectIcon";
import { ingredientApi } from "../../../api/IngredientApi";
import { useToast } from "../../../context/ToastContext";

const IngredientEditForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: ingredientId } = useParams(); // URL에서 식재료 ID 추출
  const ingredientFromLocation = location.state?.ingredient; // 이전 페이지에서 전달받은 식재료 정보

  // 상태 관리
  const { showToast } = useToast();
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    emoji: "",
    name: "",
    expiryDate: "",
    mainCategory: "",
    subCategory: "",
    detailCategory: "",
    weight: "",
    image: "",
  });

  const fileInputRef = useRef(null);

  // 식재료 상세 정보 가져오기
  useEffect(() => {
    const fetchIngredientDetail = async () => {
      if (ingredientId) {
        setIsLoading(true);
        try {
          // 이미 상세 정보가 전달되었으면 그대로 사용
          if (ingredientFromLocation) {
            console.log(
              "Location에서 받은 식재료 데이터:",
              ingredientFromLocation
            );
            initializeFormWithIngredient(ingredientFromLocation);
          } else {
            // 아니면 API 호출로 상세 정보 가져오기
            const response = await ingredientApi.getIngredientDetail(
              ingredientId
            );
            if (response.success) {
              console.log("API에서 받은 식재료 데이터:", response.data);
              initializeFormWithIngredient(response.data);
            } else {
              showToast("식재료 정보를 불러오는데 실패했습니다.");

              // 실패 시 냉장고 페이지로 이동
              navigate("/refrigerator");
            }
          }
        } catch (error) {
          console.error("식재료 상세 정보 조회 오류:", error);
          showToast("서버 연결에 실패했습니다.");

          // 오류 시 냉장고 페이지로 이동
          navigate("/refrigerator");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchIngredientDetail();
  }, [ingredientId, ingredientFromLocation, navigate]);

  // 식재료 정보로 폼 초기화
  const initializeFormWithIngredient = (ingredient) => {
    // 날짜 형식 변환 (ISO 문자열 → YYYY-MM-DD)
    let formattedDate = "";
    if (ingredient.expiryDate) {
      const date = new Date(ingredient.expiryDate);
      formattedDate = date.toISOString().split("T")[0];
    }

    // 폼 데이터 설정
    setFormData({
      emoji: ingredient.emoji || "",
      name: ingredient.name || "",
      expiryDate: formattedDate,
      mainCategory: ingredient.mainCategory || "",
      subCategory: ingredient.subCategory || "",
      detailCategory: ingredient.detailCategory || "",
      weight: ingredient.quantity?.toString() || "",
      image: ingredient.image || "",
    });

    // 이미지 미리보기 설정
    if (ingredient.image) {
      setImagePreview(ingredient.image);
    }

    // 디버깅 로그
    console.log("폼 초기화 완료:", {
      mainCategory: ingredient.mainCategory,
      subCategory: ingredient.subCategory,
      detailCategory: ingredient.detailCategory,
    });
  };

  // 카테고리 데이터 로드
  useEffect(() => {
    // 카테고리 데이터가 있을 때만 실행
    if (
      formData.mainCategory &&
      formData.subCategory &&
      formData.detailCategory
    ) {
      console.log("카테고리 데이터 확인:", {
        mainCategory: formData.mainCategory,
        subCategory: formData.subCategory,
        detailCategory: formData.detailCategory,
      });
    }
  }, [formData.mainCategory, formData.subCategory, formData.detailCategory]);

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 이미지 관련 핸들러
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setImagePreview(imageData);
        setFormData((prev) => ({
          ...prev,
          image: imageData,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 유효성 검사 함수
  const validateFormInline = () => {
    // 이모지 검증
    if (!formData.emoji) {
      showToast("아이콘을 선택해주세요.");

      return false;
    }

    // 식재료명 검증
    if (!formData.name.trim()) {
      showToast("식재료명을 입력해주세요.");

      return false;
    }

    // 사진 첨부 검증
    if (!formData.image && !imagePreview) {
      showToast("사진을 첨부해주세요.");

      return false;
    }

    // 유통기한 검증
    if (!formData.expiryDate) {
      showToast("유통기한을 입력해주세요.");

      return false;
    }

    // 대분류 검증
    if (!formData.mainCategory) {
      showToast("대분류를 선택해주세요.");

      return false;
    }

    // 중분류 검증
    if (!formData.subCategory) {
      showToast("중분류를 선택해주세요.");

      return false;
    }

    // 소분류 검증
    if (!formData.detailCategory) {
      showToast("소분류를 선택해주세요.");

      return false;
    }

    // 중량 검증
    if (!formData.weight) {
      showToast("중량을 입력해주세요.");

      return false;
    }

    // 중량이 정수인지 확인
    if (formData.weight && isNaN(parseInt(formData.weight))) {
      showToast("중량은 정수만 입력 가능합니다.");

      return false;
    }

    // 모든 검증 통과
    return true;
  };

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    // 유효성 검사 실행
    if (!validateFormInline()) {
      return;
    }

    // 식재료 수정 API 호출
    setIsLoading(true);
    try {
      // formData 준비 (userId 필요 없음)
      const ingredientData = {
        ...formData,
        weight: parseInt(formData.weight), // weight를 int로 변환
        image: formData.image || imagePreview, // image 데이터 저장
      };

      // API 호출 (ingredientId를 Number로 변환)
      const result = await ingredientApi.updateIngredient(
        Number(ingredientId),
        ingredientData
      );

      if (!result.success) {
        showToast(result.error || "식재료 수정에 실패했습니다.");

        setIsLoading(false);
        return;
      }

      // 성공 메시지 표시
      showToast("식재료가 수정되었습니다.");

      // 냉장고 메인 페이지로 이동
      navigate("/refrigerator");
    } catch (error) {
      console.error("식재료 수정 중 오류 발생:", error);
      showToast("다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

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

  // 대분류에 따른 중분류 옵션
  const getSubOptions = () => {
    if (!formData.mainCategory || !categoryData[formData.mainCategory]) {
      return [{ value: "", label: "중분류" }];
    }
    return [
      { value: "", label: "중분류" },
      ...categoryData[formData.mainCategory].options,
    ];
  };

  // 중분류에 따른 소분류 옵션
  const getDetailOptions = () => {
    if (
      !formData.mainCategory ||
      !formData.subCategory ||
      !categoryData[formData.mainCategory] ||
      !categoryData[formData.mainCategory].subCategories[formData.subCategory]
    ) {
      return [{ value: "", label: "소분류" }];
    }

    return [
      { value: "", label: "소분류" },
      ...categoryData[formData.mainCategory].subCategories[
        formData.subCategory
      ],
    ];
  };

  // 대분류 변경 시 중분류, 소분류 초기화
  const handleMainCategoryChange = (e) => {
    setFormData({
      ...formData,
      mainCategory: e.target.value,
      subCategory: "",
      detailCategory: "",
    });
  };

  // 중분류 변경 시 소분류 초기화
  const handleSubCategoryChange = (e) => {
    setFormData({
      ...formData,
      subCategory: e.target.value,
      detailCategory: "",
    });
  };

  return (
    <>
      <Header
        // leftIcon={backArrow}
        title="식재료 수정"
        rightIcon={close}
        // onLeftClick={() => window.history.back()}
        onRightClick={() => navigate("/refrigerator")}
      />

      <div className="add-form-wrapper">
        <div className="add-form-container">
          <h3 className="add-form-label bold">식재료명</h3>

          <div className="name-container">
            <SelectIcon
              value={formData.emoji}
              onChange={(emoji) =>
                setFormData((prev) => ({
                  ...prev,
                  emoji,
                }))
              }
            />

            <Input
              className="add-form-input"
              placeholder="식재료명을 입력해 주세요."
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              width="275px"
            />
          </div>
        </div>

        <div className="add-form-container">
          <h3 className="add-form-label bold">사진 첨부</h3>
          <div
            className="image-upload-container"
            onClick={handleImageClick}
            style={{
              backgroundImage: imagePreview ? `url(${imagePreview})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!imagePreview && (
              <img src={plus} alt="이미지 추가" className="image-plus-icon" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <div className="add-form-container">
          <h3 className="add-form-label bold">유통기한</h3>
          <Input
            className="add-form-input"
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="add-form-container">
          <h3 className="add-form-label bold">분류기준</h3>
          <div className="add-form-select-container">
            <SelectL
              key={`main-category-${ingredientId}`}
              options={mainOptions}
              className="select-item"
              value={formData.mainCategory}
              onChange={handleMainCategoryChange}
            />
            <SelectL
              key={`sub-category-${ingredientId}`}
              options={getSubOptions()}
              className="select-item"
              value={formData.subCategory}
              onChange={handleSubCategoryChange}
            />
            <SelectL
              key={`detail-category-${ingredientId}`}
              options={getDetailOptions()}
              className="select-item"
              value={formData.detailCategory}
              onChange={(e) =>
                setFormData({ ...formData, detailCategory: e.target.value })
              }
            />
          </div>
        </div>

        <div className="add-form-container">
          <h3 className="add-form-label bold">중량</h3>
          <Input
            className="add-form-input"
            placeholder="중량(g)을 입력해 주세요."
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="add-form-button-container">
        <ButtonL
          text="취소"
          variant="outlined"
          onClick={() => window.history.back()}
          disabled={isLoading}
        />
        <ButtonL
          text={isLoading ? "처리 중..." : "수정하기"}
          onClick={() => {
            if (validateFormInline()) {
              handleSubmit();
            }
          }}
          disabled={isLoading}
        />
      </div>

      <div style={{ height: "100px" }}></div>
      <Menu />
    </>
  );
};

export default IngredientEditForm;
