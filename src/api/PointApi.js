// src/api/PointApi.js
import axios from "axios";
import { authApi } from "./AuthApi";
import { BASE_URL } from "../config";

export const pointApi = {
  // 포인트 요약 정보 조회
  getPointSummary: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/points/summary`, {
        headers: {
          ...authApi.getAuthHeader(),
        },
      });

      return response.data;
    } catch (error) {
      console.error("포인트 요약 정보 조회 오류:", error);

      // 개발 모드에서는 목업 데이터 반환
      if (process.env.NODE_ENV === "development") {
        return getMockPointSummary();
      }
      throw error;
    }
  },

  // 포인트 사용/적립 내역 조회
  getPointHistory: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/points/history`, {
        headers: {
          ...authApi.getAuthHeader(),
        },
      });

      if (response.status === 204) {
        return [];
      }

      return response.data;
    } catch (error) {
      console.error("포인트 내역 조회 오류:", error);

      // 개발 모드에서는 목업 데이터 반환
      if (process.env.NODE_ENV === "development") {
        return getMockPointHistory();
      }
      throw error;
    }
  },

  // 카드 정보 조회
  // PointApi.js 수정
  getCardInfo: async () => {
    try {
      // 사용자 정보 가져오기
      const userInfo = JSON.parse(localStorage.getItem("user"));
      const userId = userInfo?.memberId;

      if (!userId) {
        throw new Error("사용자 ID를 찾을 수 없습니다.");
      }

      // CardCompletion과 동일한 API 사용
      const response = await axios.get(
        `${BASE_URL}/solpick/api/card-design/card-info/${userId}`,
        {
          headers: {
            ...authApi.getAuthHeader(),
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("카드 정보 조회 오류:", error);

      // 개발 모드에서는 목업 데이터 반환
      if (process.env.NODE_ENV === "development") {
        return getMockCardInfo();
      }
      throw error;
    }
  },

  // getCardInfo: async () => {
  //     try {
  //         const response = await axios.get(`${BASE_URL}/api/points/card`, {
  //             headers: {
  //                 ...authApi.getAuthHeader()
  //             }
  //         });

  //         return response.data;
  //     } catch (error) {
  //         console.error('카드 정보 조회 오류:', error);

  //         // 개발 모드에서는 목업 데이터 반환
  //         if (process.env.NODE_ENV === 'development') {
  //             return getMockCardInfo();
  //         }
  //         throw error;
  //     }
  // }
};

// 목업 포인트 요약 데이터
const getMockPointSummary = () => {
  return {
    currentPoints: 10000,
    totalEarnedPoints: 15500,
    totalUsedPoints: 5500,
    message: "총 10,000포인트 있어요!",
  };
};

// 목업 포인트 내역 데이터
const getMockPointHistory = () => {
  return [
    {
      pointId: 1,
      date: "2.25",
      description: "고양이게임 적립",
      amount: 2614,
      type: "EARN",
    },
    {
      pointId: 2,
      date: "2.25",
      description: "레시픽 쇼핑",
      amount: 2614,
      type: "USE",
    },
    {
      pointId: 3,
      date: "2.25",
      description: "고양이게임 적립",
      amount: 2614,
      type: "EARN",
    },
    {
      pointId: 4,
      date: "2.25",
      description: "레시픽 쇼핑",
      amount: 2614,
      type: "USE",
    },
  ];
};

// // 목업 카드 정보 데이터
// const getMockCardInfo = () => {
//   return {
//     cardId: 1,
//     cardNumber: "************1234",
//     cardType: "신한카드",
//     cardStatus: "정상",
//     cardImageUrl: "https://example.com/card-image.png",
//     issueDate: "2023-01-01",
//     expiredAt: "2028-01-01",
//   };
// };

// 목업 카드 정보 데이터 - CardCompletion과 동일한 구조로 수정
const getMockCardInfo = () => {
  return {
    cardId: 1,
    cardNumber: "9411 **** **** 1234",
    expiryDate: "03/28",
    cvcNumber: "123",
    firstName: "HONG",
    lastName: "GILDONG",
    backgroundId: 1,
    stickersData: "[]", // 빈 스티커 데이터
  };
};
