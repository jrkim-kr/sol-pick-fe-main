import React, { useState, useEffect } from "react";
import "./DiscoveredIngredients.css";
import discoveredIng from "../../assets/game/discoverdIng.svg";
import { getDiscoveredIngredients } from "../../api/GameApi";
import recipes from "./RecipeData"; // 로컬 레시피 데이터 (아이콘 정보용)

/**
 * 발견한 식재료 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {number|null} props.selectedRecipeId - 선택한 레시피 ID
 * @param {number} props.ingredientsCount - 발견한 식재료 총 개수 (게임 상태에서 가져온 값)
 * @returns {JSX.Element} 발견한 식재료 컴포넌트
 */
const DiscoveredIngredients = ({ selectedRecipeId, ingredientsCount = 0 }) => {
  // 상태 관리
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [discoveredCount, setDiscoveredCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [lastFetch, setLastFetch] = useState(0); // 마지막 데이터 가져온 시간 추적

  console.log("DiscoveredIngredients 렌더링", {
    selectedRecipeId,
    ingredientsCount,
    loading,
    error,
    ingredients,
  });

  // 컴포넌트 마운트 시와 ingredientsCount가 변경될 때마다 식재료 정보 가져오기
  useEffect(() => {
    // 레시피가 선택되지 않은 경우
    if (!selectedRecipeId) {
      console.log("선택된 레시피 없음");
      setError("선택된 레시피가 없습니다");
      return;
    }

    const fetchIngredients = async () => {
      try {
        setLoading(true);
        console.log(
          `식재료 데이터 가져오기 시작 (recipeId: ${selectedRecipeId}, ingredientsCount: ${ingredientsCount})`
        );

        // 1. 로컬 레시피 데이터에서 레시피 정보 찾기 (아이콘 정보를 위해)
        const recipeData = recipes.find((r) => r.id === selectedRecipeId);

        if (!recipeData) {
          console.error(
            "로컬 데이터에서 레시피를 찾을 수 없음:",
            selectedRecipeId
          );
          setError("레시피 정보를 찾을 수 없습니다");
          setLoading(false);
          return;
        }

        console.log("로컬에서 레시피 찾음:", recipeData.name);

        // 2. 서버에서 발견한 식재료 데이터 가져오기
        try {
          console.log("서버에 식재료 데이터 요청 중...");
          const ingredientsData = await getDiscoveredIngredients(
            selectedRecipeId
          );
          console.log("서버에서 받은 식재료 데이터:", ingredientsData);

          if (!ingredientsData) {
            throw new Error("서버에서 식재료 데이터를 받지 못했습니다");
          }

          if (!Array.isArray(ingredientsData)) {
            throw new Error(
              `유효하지 않은 식재료 데이터 형식: ${typeof ingredientsData}`
            );
          }

          // 빈 배열이 올 경우를 위한 처리
          if (ingredientsData.length === 0) {
            console.log("서버에서 빈 식재료 배열을 받음");
            setIngredients([]);
            setDiscoveredCount(0);
            setTotalCount(0);
            setLoading(false);
            setError(null);
            return;
          }

          // 3. 서버 데이터와 로컬 레시피 아이콘 정보 결합
          const combinedIngredients = ingredientsData
            .map((serverIngredient) => {
              // 식재료 이름 확인
              if (!serverIngredient.ingredientName) {
                console.warn("식재료 이름이 없는 항목:", serverIngredient);
                return null;
              }

              // 로컬 레시피 데이터에서 해당 식재료 정보 찾기
              const localIngredient = recipeData.ingredients.find(
                (ing) => ing.name === serverIngredient.ingredientName
              );

              // 매칭되는 로컬 식재료가 없는 경우
              if (!localIngredient) {
                console.warn(
                  `로컬 레시피에 없는 식재료: ${serverIngredient.ingredientName}`
                );
              }

              // 서버 데이터와 로컬 아이콘 정보 결합
              return {
                name: serverIngredient.ingredientName,
                discovered: serverIngredient.discovered || false,
                count: serverIngredient.count || 0,
                requiredQuantity: serverIngredient.requiredQuantity || 1,
                icon: localIngredient ? localIngredient.icon : null,
              };
            })
            .filter((item) => item !== null); // null 항목 제거

          console.log("결합된 식재료 데이터:", combinedIngredients);

          // 상태 업데이트
          const discoveredItems = combinedIngredients.filter(
            (ing) => ing.discovered
          );
          setIngredients(combinedIngredients);
          setDiscoveredCount(discoveredItems.length);
          setTotalCount(combinedIngredients.length);
          setError(null);
          setLastFetch(Date.now()); // 마지막 가져온 시간 업데이트
        } catch (serverError) {
          console.error("서버에서 식재료 데이터 가져오기 실패:", serverError);

          // 대체 데이터 사용 (로컬 레시피의 식재료 정보로 가상 데이터 생성)
          const fallbackIngredients = recipeData.ingredients.map((ing) => ({
            name: ing.name,
            discovered: false,
            count: 0,
            requiredQuantity: ing.quantity || 1,
            icon: ing.icon,
          }));

          console.log("대체 식재료 데이터 사용:", fallbackIngredients);
          setIngredients(fallbackIngredients);
          setDiscoveredCount(0);
          setTotalCount(fallbackIngredients.length);
          setError(
            "서버에서 식재료 정보를 가져오지 못했습니다. 기본 데이터를 표시합니다."
          );
        }
      } catch (error) {
        console.error("식재료 데이터 처리 중 오류 발생:", error);
        setError("식재료 정보를 처리하는 중 오류가 발생했습니다");
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, [selectedRecipeId, ingredientsCount]); // selectedRecipeId나 ingredientsCount가 변경될 때마다 실행

  // 식재료 아이콘을 렌더링하는 함수
  const renderIngredientIcon = (ingredient, index) => {
    return (
      <div
        key={index}
        className={`ingredient-icon ${
          ingredient.discovered ? "discovered" : "undiscovered"
        }`}
        title={ingredient.name}
      >
        <div className="ingredient-image">
          {ingredient.discovered ? (
            <>
              {ingredient.icon ? (
                <img src={ingredient.icon} alt={ingredient.name} />
              ) : (
                <div className="no-icon">{ingredient.name.charAt(0)}</div>
              )}

              {/* 수량이 1보다 크면 수량 표시 배지 추가 */}
              {ingredient.count > 1 && (
                <span className="ingredient-count-badge">
                  {ingredient.count}
                </span>
              )}
            </>
          ) : (
            <div className="locked-icon">?</div>
          )}
        </div>
      </div>
    );
  };

  // 로딩 상태 표시
  if (loading) {
    return (
      <div className="discovered-ingredients-container loading">
        <div className="loading-text">식재료 정보 로딩 중...</div>
      </div>
    );
  }

  // 오류 상태 표시
  if (error && ingredients.length === 0) {
    return (
      <div className="discovered-ingredients-container error">
        <div className="error-text">{error}</div>
      </div>
    );
  }

  // 식재료가 없는 경우
  if (ingredients.length === 0) {
    return (
      <div className="discovered-ingredients-container empty">
        <div className="empty-text">식재료 정보가 없습니다</div>
      </div>
    );
  }

  return (
    <div className="discovered-ingredients-container">
      {/* 발견한 식재료 헤더 */}
      <div className="discovered-header">
        <div className="discovered-title">
          <img
            src={discoveredIng}
            alt="Discovered Ingredients"
            className="discovered-ing-icon"
          />
          <span className="title-text pixel-font-kr">
            발견한 식재료 ({discoveredCount}/{totalCount})
          </span>
        </div>
        <hr className="discovered-ing-divider" />
      </div>

      {/* 식재료 아이콘 그리드 */}
      <div className="ingredient-grid">
        {ingredients.map((ingredient, index) =>
          renderIngredientIcon(ingredient, index)
        )}
      </div>

      {/* 디버그 정보 (개발용) */}
      {error && (
        <div className="debug-info error-message">
          <small>오류: {error}</small>
        </div>
      )}
    </div>
  );
};

export default DiscoveredIngredients;
