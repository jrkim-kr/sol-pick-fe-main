import axios from "axios";
import { authApi } from "./AuthApi"; // 인증 관련 API 함수들
import recipes from "../components/game/RecipeData"; // 클라이언트 측 레시피 데이터
import { saveSelectedRecipe as saveRecipeToLocalStorage } from "../utils/game/storageUtils"; // 로컬 스토리지 유틸

const BASE_URL = "http://localhost:8090"; // 서버 기본 URL

// API 호출을 위한 기본 설정
const gameApiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 설정 - 매 요청마다 인증 헤더 추가
gameApiClient.interceptors.request.use(
  (config) => {
    const authHeader = authApi.getAuthHeader();
    config.headers = {
      ...config.headers,
      ...authHeader,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 레시피 선택 저장
 * @param {number} recipeId - 선택한 레시피 ID
 * @returns {Promise} - 응답 프로미스
 */
export const saveSelectedRecipe = async (recipeId) => {
  try {
    // localStorage에서 사용자 ID 가져오기
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.memberId;

    // 서버에 레시피 선택 저장
    const response = await gameApiClient.post(
      "/solpick/api/game/recipe/select",
      {
        userId: userId,
        recipeId: recipeId,
      }
    );

    console.log("Server response:", response);

    // 항상 localStorage에 저장 (response 확인 없이)
    console.log("Saving recipeId to localStorage:", recipeId);
    saveRecipeToLocalStorage(recipeId);

    return response.data;
  } catch (error) {
    console.error("레시피 선택 저장 실패:", error);
    throw error;
  }
};

/**
 * 선택한 레시피 조회
 * @returns {Promise} - 선택한 레시피 ID를 포함한 응답 프로미스
 */
export const getSelectedRecipe = async () => {
  try {
    // localStorage에서 사용자 ID 가져오기
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.memberId;

    // 서버에서 선택한 레시피 조회
    const response = await gameApiClient.get(
      `/solpick/api/game/recipe/selected/${userId}`
    );
    return response.data;
  } catch (error) {
    // 204 No Content는 정상 응답이므로 null 반환
    if (error.response && error.response.status === 204) {
      return null;
    }
    console.error("선택한 레시피 조회 실패:", error);
    throw error;
  }
};

/**
 * 게임 상태 조회
 * @returns {Promise} - 게임 상태를 포함한 응답 프로미스
 */
export const getGameState = async () => {
  try {
    // localStorage에서 사용자 ID 가져오기
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.memberId;

    // 서버에서 게임 상태 조회
    const response = await gameApiClient.get(
      `/solpick/api/game/state/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("게임 상태 조회 실패:", error);
    throw error;
  }
};

/**
 * 게임 상태 업데이트
 * @param {Object} gameState - 업데이트할 게임 상태
 * @returns {Promise} - 업데이트된 게임 상태를 포함한 응답 프로미스
 */
export const updateGameState = async (gameState) => {
  try {
    // localStorage에서 사용자 ID 가져오기
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.memberId;

    // 서버에 게임 상태 업데이트
    const response = await gameApiClient.put(
      `/solpick/api/game/state/${userId}`,
      gameState
    );
    return response.data;
  } catch (error) {
    console.error("게임 상태 업데이트 실패:", error);
    throw error;
  }
};

/**
 * 식재료 발견 정보 초기화
 * @param {number} recipeId - 레시피 ID
 * @returns {Promise} - 응답 프로미스
 */
export const initializeDiscoveredIngredients = async (recipeId) => {
  try {
    // localStorage에서 사용자 ID 가져오기
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.memberId;

    // 선택한 레시피 객체 가져오기
    const selectedRecipe = recipes.find((r) => r.id === recipeId);

    if (selectedRecipe) {
      // 서버에 식재료 발견 정보 초기화 요청
      const ingredientsInfo = selectedRecipe.ingredients.map((ing) => ({
        name: ing.name,
        requiredQuantity: ing.quantity,
      }));

      const response = await gameApiClient.post(
        "/solpick/api/game/initialize-ingredients",
        {
          userId: userId,
          recipeId: recipeId,
          ingredients: ingredientsInfo,
        }
      );

      return response.data;
    }

    throw new Error("선택한 레시피를 찾을 수 없습니다.");
  } catch (error) {
    console.error("식재료 발견 정보 초기화 실패:", error);
    throw error;
  }
};

// GameApi.js 내에서 discoverIngredient 함수를 수정

/**
 * 식재료 발견 처리
 * @param {number} recipeId - 레시피 ID
 * @param {string} ingredientName - 식재료 이름
 * @returns {Promise} - 발견 결과를 포함한 응답 프로미스
 */
export const discoverIngredient = async (recipeId, ingredientName) => {
  try {
    // localStorage에서 사용자 ID 가져오기
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.memberId;

    // 선택한 레시피 객체 가져오기 (포인트 정보 포함)
    const selectedRecipe = recipes.find((r) => r.id === recipeId);
    const recipePoints = selectedRecipe ? selectedRecipe.points || 5000 : 5000;

    // 서버에 식재료 발견 처리 요청
    const response = await gameApiClient.post(
      "/solpick/api/game/discover-ingredient",
      {
        userId: userId,
        recipeId: recipeId,
        ingredientName: ingredientName,
        recipePoints: recipePoints,
      }
    );

    // API 응답에 식재료 이름이 포함되어 있지 않으면 추가
    const result = response.data;
    if (!result.ingredientName) {
      result.ingredientName = ingredientName;
    }

    // 추가적인 검사: 레시피 완성 여부 확인
    // 서버 응답에 isRecipeCompleted가 없거나 undefined인 경우
    // 식재료 목록을 가져와서 자체적으로 확인
    if (result.isRecipeCompleted === undefined) {
      console.log(
        "서버에서 isRecipeCompleted 정보를 제공하지 않음, 자체 확인 진행"
      );

      try {
        // 현재 발견한 식재료 목록 조회
        const discoveredIngredients = await getDiscoveredIngredients(recipeId);

        if (Array.isArray(discoveredIngredients)) {
          // 모든 식재료가 필요 수량만큼 발견되었는지 확인
          const allDiscovered = discoveredIngredients.every(
            (ing) => ing.discovered && ing.count >= ing.requiredQuantity
          );

          // 결과 객체에 레시피 완성 여부 추가
          result.isRecipeCompleted = allDiscovered;
          console.log(`자체 확인 결과: isRecipeCompleted = ${allDiscovered}`);
        }
      } catch (error) {
        console.error("식재료 완성 여부 자체 확인 실패:", error);
      }
    }

    // 디버깅 로그
    console.log("최종 discoveryResult:", result);

    return result;
  } catch (error) {
    console.error("식재료 발견 처리 실패:", error);
    throw error;
  }
};

/**
 * 사료 추가
 * @param {number} amount - 추가할 사료 수량
 * @returns {Promise} - 응답 프로미스
 */
export const addFood = async (amount) => {
  try {
    // localStorage에서 사용자 ID 가져오기
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.memberId;

    // 서버에 사료 추가 요청
    const response = await gameApiClient.put(
      `/solpick/api/game/add-food/${userId}`,
      {
        amount: amount,
      }
    );

    return response.data;
  } catch (error) {
    console.error("사료 추가 실패:", error);
    throw error;
  }
};

/**
 * 발견한 식재료 목록 조회
 * @param {number} recipeId - 레시피 ID
 * @returns {Promise} - 발견한 식재료 목록을 포함한 응답 프로미스
 */
export const getDiscoveredIngredients = async (recipeId) => {
  try {
    // localStorage에서 사용자 ID 가져오기
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.memberId;

    // 서버에서 발견한 식재료 목록 조회
    const response = await gameApiClient.get(
      `/solpick/api/game/discovered-ingredients/${userId}/${recipeId}`
    );
    return response.data;
  } catch (error) {
    console.error("발견한 식재료 목록 조회 실패:", error);
    throw error;
  }
};

/**
 * 완성된 레시피 목록 조회
 * @returns {Promise} - 완성된 레시피 목록을 포함한 응답 프로미스
 */
export const getCompletedRecipes = async () => {
  try {
    // localStorage에서 사용자 ID 가져오기
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.memberId;

    // 서버에서 완성된 레시피 목록 조회
    const response = await gameApiClient.get(
      `/solpick/api/game/completed-recipes/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("완성된 레시피 목록 조회 실패:", error);
    throw error;
  }
};

// GameApi.js 파일에 resetGameData 함수 추가
/**
 * 게임 데이터 초기화
 * 선택한 레시피, 발견한 식재료 정보 초기화 및 게임 상태 재설정
 * @returns {Promise} - 응답 프로미스
 */
export const resetGameData = async () => {
  try {
    // localStorage에서 사용자 ID 가져오기
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.memberId;

    // 1. 게임 상태 기본값으로 리셋
    const defaultGameState = {
      level: 1,
      currentExp: 0,
      energy: 100,
      food: 10,
      ingredientsCount: 0,
    };

    // 2. 서버에 게임 상태 업데이트
    await updateGameState(defaultGameState);

    // 3. 로컬 스토리지의 선택된 레시피 정보 삭제
    localStorage.removeItem("selectedRecipeId");

    // 4. 로깅
    console.log("게임 데이터 초기화 완료:", userId);

    return true;
  } catch (error) {
    console.error("게임 데이터 초기화 실패:", error);
    throw error;
  }
};
