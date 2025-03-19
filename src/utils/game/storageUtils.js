/**
 * 로컬 스토리지에 선택한 레시피 ID 저장
 * @param {number} recipeId - 저장할 레시피 ID
 */
export const saveSelectedRecipe = (recipeId) => {
  console.log("Saving recipe ID to localStorage:", recipeId);
  localStorage.setItem("selectedRecipeId", recipeId.toString());

  // 저장 후 바로 확인하여 제대로 저장되었는지 검증
  const savedId = localStorage.getItem("selectedRecipeId");
  console.log("Verification - Saved recipe ID:", savedId);
};

/**
 * 로컬 스토리지에서 선택한 레시피 ID 불러오기
 * @returns {number|null} 선택된 레시피 ID (없으면 null)
 */
export const getSelectedRecipe = () => {
  const recipeId = localStorage.getItem("selectedRecipeId");
  console.log("Reading recipe ID from localStorage:", recipeId);
  return recipeId ? parseInt(recipeId, 10) : null;
};

/**
 * 게임 상태를 로컬 스토리지에 저장
 * @param {Object} gameState - 게임 상태 객체
 */
export const saveGameState = (gameState) => {
  localStorage.setItem("gameState", JSON.stringify(gameState));
};

/**
 * 로컬 스토리지에서 게임 상태 불러오기
 * @returns {Object} 게임 상태 객체
 */
export const getGameState = () => {
  const savedState = localStorage.getItem("gameState");
  if (savedState) {
    return JSON.parse(savedState);
  }

  // 기본 상태 반환
  return {
    level: 1,
    currentExp: 0,
    energy: 100,
    food: 10,
    ingredients: 0,
  };
};

/**
 * 발견한 식재료 정보를 로컬 스토리지에 저장
 * @param {Object} ingredientsData - 식재료 정보 객체
 */
export const saveDiscoveredIngredients = (ingredientsData) => {
  localStorage.setItem(
    "discoveredIngredients",
    JSON.stringify(ingredientsData)
  );
};

/**
 * 로컬 스토리지에서 발견한 식재료 정보 불러오기
 * @returns {Object} 발견한 식재료 정보 객체
 */
export const getDiscoveredIngredients = () => {
  const savedIngredients = localStorage.getItem("discoveredIngredients");
  if (savedIngredients) {
    return JSON.parse(savedIngredients);
  }

  // 기본 값 반환
  return {
    items: [],
  };
};

/**
 * 특정 식재료의 발견 정보를 업데이트
 * @param {string} ingredientName - 식재료 이름
 * @param {Object} data - 업데이트할 데이터 (count 등)
 */
export const updateIngredient = (ingredientName, data) => {
  const ingredients = getDiscoveredIngredients();
  const items = ingredients.items || [];

  // 해당 식재료가 이미 발견됐는지 확인
  const existingIndex = items.findIndex((item) => item.name === ingredientName);

  if (existingIndex !== -1) {
    // 기존 항목 업데이트
    items[existingIndex] = {
      ...items[existingIndex],
      ...data,
      count: (items[existingIndex].count || 0) + 1,
    };
  } else {
    // 새 항목 추가
    items.push({
      name: ingredientName,
      discovered: true,
      count: 1,
      ...data,
    });
  }

  // 업데이트된 정보 저장
  saveDiscoveredIngredients({ items });

  return { items };
};

/**
 * 로컬 스토리지의 모든 게임 데이터 초기화
 */
export const resetGameData = () => {
  console.log("Resetting all game data in localStorage");
  localStorage.removeItem("selectedRecipeId");
  localStorage.removeItem("gameState");
  localStorage.removeItem("discoveredIngredients");
};
