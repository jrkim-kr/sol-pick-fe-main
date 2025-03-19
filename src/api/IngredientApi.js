import axios from "axios";
import { authApi } from "./AuthApi";
import { BASE_URL } from "../config";
import imageCompression from "browser-image-compression";

// 이미지 압축 함수
export const compressImage = async (base64Image, maxSizeMB = 0.5) => {
  try {
    // base64를 파일로 변환
    const fetchRes = await fetch(base64Image);
    const blob = await fetchRes.blob();

    const file = new File([blob], "image.jpg", { type: "image/jpeg" });

    // 압축 옵션
    const options = {
      maxSizeMB, // 최대 크기 (MB)
      maxWidthOrHeight: 400, // 최대 너비 또는 높이
      useWebWorker: true, // 웹 워커 사용 (성능 향상)
    };

    // 이미지 압축
    const compressedFile = await imageCompression(file, options);

    // 다시 base64로 변환
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  } catch (error) {
    console.error("이미지 압축 실패:", error);
    // 압축 실패 시 원본 이미지 반환
    return base64Image;
  }
};

export const ingredientApi = {
  // 식재료 등록
  addIngredient: async (ingredientData) => {
    try {
      // 이미지가 있으면 압축
      let compressedImage = ingredientData.image;
      if (compressedImage && compressedImage.startsWith("data:image")) {
        compressedImage = await compressImage(compressedImage);
      }

      // 사용자 정보에서 userId 가져오기
      const user = authApi.getCurrentUser();
      const userId = user?.memberId;

      // 요청 데이터 준비
      const requestData = {
        userId: userId,
        name: ingredientData.name || "",
        emoji: ingredientData.emoji || "🍎", // 기본 이모지
        image: compressedImage || "",
        quantity: parseInt(ingredientData.weight) || 0,
        expiryDate: ingredientData.expiryDate
          ? new Date(ingredientData.expiryDate).toISOString()
          : null,
        mainCategory: ingredientData.mainCategory || "",
        subCategory: ingredientData.subCategory || "",
        detailCategory: ingredientData.detailCategory || "",
      };

      // API 요청
      const response = await axios.post(
        `${BASE_URL}/api/solpick/refrigerator/ingredients`,
        requestData,
        {
          headers: {
            ...authApi.getAuthHeader(),
            "Content-Type": "application/json",
          },
        }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("식재료 등록 실패:", error);

      if (error.response) {
        console.error("서버 응답 데이터:", error.response.data);
        console.error("서버 응답 상태 코드:", error.response.status);
      }

      return {
        success: false,
        error: error.message || "식재료 등록에 실패했습니다.",
      };
    }
  },

  // 식재료 수정
  updateIngredient: async (ingredientId, ingredientData) => {
    try {
      // 이미지가 있으면 압축
      let compressedImage = ingredientData.image;
      if (compressedImage && compressedImage.startsWith("data:image")) {
        compressedImage = await compressImage(compressedImage);
      }

      // 요청 데이터 준비
      const requestData = {
        name: ingredientData.name || "",
        emoji: ingredientData.emoji || "🍎", // 기본 이모지
        image: compressedImage || "",
        quantity: parseInt(ingredientData.weight) || 0,
        expiryDate: ingredientData.expiryDate
          ? new Date(ingredientData.expiryDate).toISOString()
          : null,
        mainCategory: ingredientData.mainCategory || "",
        subCategory: ingredientData.subCategory || "",
        detailCategory: ingredientData.detailCategory || "",
      };

      // API 요청
      const response = await axios.put(
        `${BASE_URL}/api/solpick/refrigerator/ingredients/${ingredientId}`,
        requestData,
        {
          headers: {
            ...authApi.getAuthHeader(),
            "Content-Type": "application/json",
          },
        }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("식재료 수정 실패:", error);

      if (error.response) {
        console.error("서버 응답 데이터:", error.response.data);
        console.error("서버 응답 상태 코드:", error.response.status);
      }

      return {
        success: false,
        error: error.message || "식재료 수정에 실패했습니다.",
      };
    }
  },

  // 식재료 삭제
  deleteIngredient: async (ingredientId) => {
    try {
      // API 요청
      await axios.delete(
        `${BASE_URL}/api/solpick/refrigerator/ingredients/${ingredientId}`,
        {
          headers: authApi.getAuthHeader(),
        }
      );

      return {
        success: true,
      };
    } catch (error) {
      console.error("식재료 삭제 실패:", error);
      return {
        success: false,
        error: error.message || "식재료 삭제에 실패했습니다.",
      };
    }
  },

  // 식재료 목록 조회
  getIngredientList: async (sortType = "latest") => {
    try {
      // 사용자 정보에서 userId 가져오기
      const user = authApi.getCurrentUser();
      const userId = user?.memberId;

      // API 요청
      const response = await axios.get(
        `${BASE_URL}/api/solpick/refrigerator/ingredients/list/${userId}?sortType=${sortType}`,
        {
          headers: authApi.getAuthHeader(),
        }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("식재료 목록 조회 실패:", error);
      return {
        success: false,
        error: error.message || "식재료 목록을 불러오는데 실패했습니다.",
        data: [],
      };
    }
  },

  // 카테고리별 식재료 목록 조회
  getIngredientsByCategories: async (
    mainCategory = "",
    subCategory = "",
    detailCategory = "",
    sortType = "latest"
  ) => {
    try {
      // 사용자 정보에서 userId 가져오기
      const user = authApi.getCurrentUser();
      const userId = user?.memberId;

      // 카테고리 필터 파라미터 구성
      const params = new URLSearchParams();
      if (mainCategory) params.append("mainCategory", mainCategory);
      if (subCategory) params.append("subCategory", subCategory);
      if (detailCategory) params.append("detailCategory", detailCategory);
      params.append("sortType", sortType);

      // API 요청
      const response = await axios.get(
        `${BASE_URL}/api/solpick/refrigerator/ingredients/list/category/${userId}?${params.toString()}`,
        {
          headers: authApi.getAuthHeader(),
        }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("카테고리별 식재료 목록 조회 실패:", error);
      return {
        success: false,
        error: error.message || "식재료 목록을 불러오는데 실패했습니다.",
        data: [],
      };
    }
  },

  // 식재료 상세 정보 조회
  getIngredientDetail: async (ingredientId) => {
    try {
      // API 요청
      const response = await axios.get(
        `${BASE_URL}/api/solpick/refrigerator/ingredients/detail/${ingredientId}`,
        {
          headers: authApi.getAuthHeader(),
        }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("식재료 상세 정보 조회 실패:", error);
      return {
        success: false,
        error: error.message || "식재료 정보를 불러오는데 실패했습니다.",
        data: null,
      };
    }
  },

  // 영수증 OCR 처리
  processReceiptOcr: async (base64Image) => {
    try {
      // 사용자 정보에서 userId 가져오기
      const user = authApi.getCurrentUser();
      const userId = user?.memberId;

      // Base64 이미지 데이터에서 헤더 제거
      const base64Data = base64Image.split(",")[1];

      // 요청 데이터 준비
      const requestData = {
        userId: userId,
        receiptImage: base64Data,
      };

      // API 요청
      const response = await axios.post(
        `${BASE_URL}/api/solpick/refrigerator/receipts/ocr`,
        requestData,
        {
          headers: {
            ...authApi.getAuthHeader(),
            "Content-Type": "application/json",
          },
        }
      );

      return {
        success: true,
        data: response.data,
        ingredientNames: response.data.ingredientNames || [],
        ocrText: response.data.ocrText,
      };
    } catch (error) {
      console.error("영수증 OCR 처리 실패:", error);
      return {
        success: false,
        error: error.message || "영수증 처리에 실패했습니다.",
        ingredientNames: [],
      };
    }
  },
};
