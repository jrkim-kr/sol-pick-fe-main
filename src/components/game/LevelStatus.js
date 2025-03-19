import React, { useState, useEffect, useRef } from "react";
import "./LevelStatus.css";
import { getSelectedRecipe } from "../../api/GameApi";
import recipes from "./RecipeData";

/**
 * 캐릭터의 레벨과 경험치 정보를 표시하는 카드 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {Object} props.gameState - 게임 상태 객체 (level, currentExp, energy, food, ingredientsCount)
 * @param {Function} props.onFeed - 밥 주기 버튼 클릭 핸들러
 * @param {Function} props.onExplore - 탐색하기 버튼 클릭 핸들러
 * @returns {JSX.Element} 레벨 상태 카드 컴포넌트
 */
const LevelStatus = ({ gameState, onFeed, onExplore }) => {
  // 선택한 레시피 상태 추가
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 이전 마운트에서 데이터를 가져왔는지 확인하기 위한 ref
  const dataFetchedRef = useRef(false);

  // 컴포넌트 마운트 시 레시피 정보 로드 (한 번만 실행)
  useEffect(() => {
    // 이미 데이터를 가져왔다면 다시 가져오지 않음
    if (dataFetchedRef.current) return;

    const fetchRecipeData = async () => {
      try {
        setLoading(true);

        // 서버에서 선택한 레시피 ID 가져오기
        const response = await getSelectedRecipe();

        if (response && response.recipeId) {
          const recipeId = response.recipeId;
          console.log("Server response - Selected Recipe ID:", recipeId);

          // 로컬 레시피 데이터에서 레시피 정보 찾기
          const recipe = recipes.find((r) => r.id === recipeId);

          if (recipe) {
            setSelectedRecipe(recipe);
            console.log("Found recipe details:", recipe);
          } else {
            console.error("Recipe not found in local data for ID:", recipeId);
            setError("레시피 정보를 찾을 수 없습니다");
          }
        } else {
          console.log("No recipe selected or empty response from server");
          setError("선택된 레시피가 없습니다");
        }
      } catch (error) {
        console.error("Error fetching recipe data:", error);
        setError("레시피 정보를 불러오는 중 오류가 발생했습니다");
      } finally {
        setLoading(false);
        dataFetchedRef.current = true; // 데이터를 가져왔음을 표시
      }
    };

    fetchRecipeData();
  }, []); // 의존성 배열을 비워 컴포넌트 마운트 시에만 실행되도록 함

  // 레벨에 따른 설정 구성
  const levelConfig = {
    1: { totalExp: 100, foodRatio: 90, ingredientRatio: 10 },
    2: { totalExp: 200, foodRatio: 80, ingredientRatio: 20 },
    3: { totalExp: 300, foodRatio: 70, ingredientRatio: 30 },
    4: { totalExp: 400, foodRatio: 60, ingredientRatio: 40 },
    5: { totalExp: 500, foodRatio: 50, ingredientRatio: 50 },
    // 추가 레벨 설정이 필요하면 여기에 추가
  };

  // 현재 레벨 설정 가져오기
  const config = levelConfig[gameState.level] || levelConfig[1];

  // 경험치 퍼센트 계산
  const expPercentage = Math.min(
    (gameState.currentExp / config.totalExp) * 100,
    100
  ).toFixed(1);

  // 픽셀 버튼 컴포넌트 (내부로 통합)
  const PixelButton = ({ children, onClick, disabled }) => {
    return (
      <div className="pixel-button-wrapper">
        <div className="pixel-button-shadow"></div>
        <button
          className={`pixel-button ${disabled ? "pixel-button-disabled" : ""}`}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </button>
      </div>
    );
  };

  // 사료가 없으면 밥 주기 버튼 비활성화
  const feedDisabled = gameState.food <= 0;

  // 에너지가 50보다 적으면 탐색하기 버튼 비활성화
  const exploreDisabled = gameState.energy < 50;

  // 로딩 중 표시
  if (loading) {
    return (
      <div className="level-status-container loading">
        <div className="loading-text">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="level-status-container">
      <div className="character-section">
        {/* 선택한 레시피 이미지 */}
        <div className="home-recipe-image">
          {selectedRecipe ? (
            <img
              src={selectedRecipe.imagePath}
              alt={selectedRecipe.name}
              className="home-recipe-img"
            />
          ) : (
            <div className="no-recipe-placeholder">
              {error || "레시피를 선택해주세요"}
            </div>
          )}
        </div>

        <div className="info-section">
          {/* 레벨 표시 및 정보 */}
          <div className="level-info-row">
            <div className="level-badge pixel-font-kr">
              레벨{gameState.level}
            </div>
            <div className="level-text pixel-font-kr">
              식재료 확률{" "}
              <span className="highlight pixel-font-kr">
                {gameState.level}배
              </span>{" "}
              <span className="emoji-up">🆙</span>
            </div>
          </div>

          {/* 경험치 바 */}
          <div className="exp-bar-container">
            <div
              className="exp-bar-fill"
              style={{ width: `${expPercentage}%` }}
            ></div>
            <div className="exp-percentage pixel-font-kr">{expPercentage}%</div>
          </div>
        </div>
      </div>

      {/* 상태 통계 */}
      <div className="stats-container">
        <div className="stat-item">
          <div className="stat-label pixel-font-kr">경험치🧪</div>
          <div className="stat-value">
            {gameState.currentExp}/{config.totalExp}
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-label pixel-font-kr">에너지🍭</div>
          <div className="stat-value">{gameState.energy}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label pixel-font-kr">사료🐟</div>
          <div className="stat-value">{gameState.food}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label pixel-font-kr">식재료🥕</div>
          <div className="stat-value">{gameState.ingredientsCount}</div>
        </div>
      </div>

      {/* 버튼 그룹 */}
      <div className="buttons-container">
        <PixelButton
          onClick={() => {
            if (feedDisabled) {
              // 사료가 부족할 때 모달 표시
              const alertModal = {
                isOpen: true,
                title: "사료 부족",
                message: "사료가 부족합니다! 사료를 획득해주세요.",
                buttons: [{ text: "확인", onClick: () => {}, type: "primary" }],
              };
              // 여기서 모달을 직접 표시할 수 없으므로 콜백 함수로 처리
              if (typeof onFeed === "function") {
                onFeed(alertModal);
              }
            } else {
              // 사료가 충분하면 일반적인 밥 주기 처리
              onFeed();
            }
          }}
          disabled={feedDisabled}
        >
          <p className="pixel-font-kr">밥 주기</p>
          <p className="food-qty">🐟 X 1</p>
        </PixelButton>
        <PixelButton onClick={onExplore} disabled={exploreDisabled}>
          <p className="pixel-font-kr">탐색하기</p>
          <p className="energy-consume">🍭 X 50</p>
        </PixelButton>
      </div>
    </div>
  );
};

export default LevelStatus;
