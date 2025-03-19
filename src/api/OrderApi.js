
import axios from 'axios';
import { authApi } from './AuthApi';
import { BASE_URL } from '../config';

export const orderApi = {
  getOrderHistory: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/member/order`, {
        headers: {
          ...authApi.getAuthHeader(),
        },
      });

      if (response.status === 204) {
        return [];
      }

      return response.data;
    } catch (error) {
      console.error("주문 내역 조회 오류:", error);

      // 개발 모드에서는 목업 데이터 반환
      if (process.env.NODE_ENV === "development") {
        return getMockOrderHistory();
      }
      throw error;
    }
  },
};

// 목업 주문 내역 데이터
const getMockOrderHistory = () => {
  return [
    {
      orderDateTime: "2024-03-10T14:30:00",
      itemName: "일주일 식단 세트",
      price: 59800,
    },
    {
      orderDateTime: "2024-03-10T10:15:00",
      itemName: "신선 과일 바구니",
      price: 28500,
    },
    {
      orderDateTime: "2024-03-05T16:45:00",
      itemName: "유기농 채소 세트",
      price: 32400,
    },
    {
      orderDateTime: "2024-02-28T11:20:00",
      itemName: "단백질 도시락 세트",
      price: 45600,
    },
    {
      orderDateTime: "2024-02-20T09:30:00",
      itemName: "제철 과일 패키지",
      price: 23500,
    },
  ];
};
