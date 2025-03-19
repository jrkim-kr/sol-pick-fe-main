import axios from "axios";
import { BASE_URL } from "../config"; // src\config.js의 BASE_URL 설정 공유

// const BASE_URL = 'http://localhost:8090';

export const authApi = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      // JWT 토큰 저장
      localStorage.setItem("token", response.data.token);

      // 응답 자체가 사용자 정보를 포함하므로 그대로 저장
      localStorage.setItem("user", JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      console.error("로그인 에러:", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  // 현재 사용자 정보 가져오기
  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        console.error("사용자 정보 파싱 오류:", e);
        return null;
      }
    }
    return null;
  },

  // API 호출을 위한 인증 헤더 가져오기
  getAuthHeader: () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};
