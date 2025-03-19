import axios from "axios";
import { authApi } from "./AuthApi";
import { BASE_URL } from "../config";

// 카드 API 기본 설정
const cardApiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 설정 - 매 요청마다 인증 헤더 추가
cardApiClient.interceptors.request.use(
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

// 카드 소유 여부 확인
export const checkHasCard = async () => {
  try {
    console.log("카드 소유 여부 확인 API 호출 중...");
    const response = await cardApiClient.get("/solpick/api/card/has-card");
    console.log("카드 소유 여부 API 응답:", response.data);
    return response.data.hasCard;
  } catch (error) {
    console.error("카드 소유 여부 확인 중 오류 발생:", error);
    if (error.response) {
      console.error("응답 데이터:", error.response.data);
      console.error("응답 상태:", error.response.status);
    }
    return false;
  }
};

// 카드 디자인 저장 - 배경 저장
export const saveCardBackground = {
  post: async (url, data) => {
    try {
      // userId 유효성 검사 추가
      if (!data.userId) {
        // localStorage에서 사용자 정보 확인
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.memberId) {
          data.userId = parseInt(user.memberId);
          console.log("userId를 localStorage에서 가져옴:", data.userId);
        } else {
          console.error(
            "userId가 없고 localStorage에도 사용자 정보가 없습니다."
          );
          throw new Error("userId가 필요합니다.");
        }
      }

      const response = await cardApiClient.post(url, data);
      return response.data;
    } catch (error) {
      console.error("배경 저장 실패:", error);
      throw error;
    }
  },
};

// 카드 디자인 저장 - 스티커 저장
export const saveCardStickers = {
  post: async (url, data) => {
    try {
      const response = await cardApiClient.post(url, data);
      return response.data;
    } catch (error) {
      console.error("스티커 저장 실패:", error);
      throw error;
    }
  },
};

export const saveCardDesign = {
  post: async (url, data) => {
    try {
      const response = await cardApiClient.post(url, data);
      return response.data;
    } catch (error) {
      console.error("카드 디자인 저장 실패:", error);
      throw error;
    }
  },
};

// 카드 발급
export const issueCard = async (userId, designId, lastName, firstName) => {
  try {
    // 1. localStorage에서 현재 로그인된 사용자 정보 가져오기
    const userInfo = JSON.parse(localStorage.getItem("user"));

    // 2. userId가 없으면 localStorage에서 가져온 정보 사용
    if (!userId && userInfo && userInfo.memberId) {
      userId = userInfo.memberId;
      console.log("localStorage에서 userId 가져옴:", userId);
    }

    // 3. 여전히 userId가 없으면 오류 발생
    if (!userId) {
      console.error("카드 발급 실패: userId가 누락되었습니다.");
      throw new Error("userId가 누락되었습니다.");
    }

    // 나머지 파라미터 검증
    if (!designId) {
      console.error("카드 발급 실패: designId가 누락되었습니다.");
      throw new Error("designId가 누락되었습니다.");
    }
    if (!lastName) {
      console.error("카드 발급 실패: lastName이 누락되었습니다.");
      throw new Error("lastName이 누락되었습니다.");
    }
    if (!firstName) {
      console.error("카드 발급 실패: firstName이 누락되었습니다.");
      throw new Error("firstName이 누락되었습니다.");
    }

    // userId를 명시적으로 정수로 변환
    const parsedUserId = parseInt(userId);

    // 요청 데이터 로깅
    console.log("카드 발급 API 호출:", {
      userId: parsedUserId,
      designId: parseInt(designId),
      lastName,
      firstName,
    });

    // 요청 보내기
    const response = await cardApiClient.post(
      "/solpick/api/card-design/issue-card",
      {
        userId: parsedUserId,
        designId: parseInt(designId),
        lastName,
        firstName,
      }
    );

    console.log("카드 발급 API 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("카드 발급 실패:", error);
    throw error;
  }
};

// 카드 정보 조회
export const getCardInfo = async (userId) => {
  try {
    if (!userId) {
      // localStorage에서 사용자 정보 확인 시도
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.memberId) {
        userId = parseInt(user.memberId);
        console.log("userId를 localStorage에서 가져옴:", userId);
      } else {
        console.error("카드 정보 조회 실패: 사용자 ID가 누락되었습니다.");
        throw new Error("사용자 ID가 누락되었습니다.");
      }
    }

    const response = await cardApiClient.get(
      `/solpick/api/card-design/card-info/${userId}`
    );

    if (!response.data) {
      console.error("카드 정보 조회 실패: 응답 데이터가 없습니다.");
      throw new Error("카드 정보를 가져오는데 실패했습니다.");
    }

    return response.data;
  } catch (error) {
    console.error("카드 정보 조회 실패:", error);
    throw error;
  }
};

// 객체 형태로도 export (이전 방식과의 호환성 유지)
export const cardApi = {
  checkHasCard,
  saveCardBackground,
  saveCardStickers,
  issueCard,
  getCardInfo,
};
