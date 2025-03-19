import axios from "axios";
import { BASE_URL } from "../config";
import { authApi } from "./AuthApi";

export const notificationApi = {
  // 푸시 알림 목록 조회
  getNotifications: async (memberId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/solpick/noti/list/${memberId}`,
        {
          headers: authApi.getAuthHeader(),
        }
      );
      return response.data;
    } catch (error) {
      console.error("읽지 않은 알림 개수 가져오기 실패:", error);
      return [];
    }
  },

  // 개별 푸시 알림 읽음 처리
  markAsRead: async (notificationId) => {
    try {
      console.log(`API 호출: 알림 ID ${notificationId} 읽음 처리 시작`);
      const response = await axios.patch(
        `${BASE_URL}/api/solpick/noti/${notificationId}/read`,
        {},
        {
          headers: authApi.getAuthHeader(),
        }
      );

      console.log(
        `API 응답: 알림 ID ${notificationId} 읽음 처리 결과`,
        response
      );

      // 응답 상태 코드 확인
      if (response.status >= 200 && response.status < 300) {
        return true;
      }
      return false;
    } catch (error) {
      console.error(`알림 ID ${notificationId} 읽음 처리 실패:`, error);

      //   // 오류 세부 정보 로깅
      //   if (error.response) {
      //     // 서버 응답이 있는 경우
      //     console.error("서버 응답:", error.response.status, error.response.data);
      //   } else if (error.request) {
      //     // 요청은 보냈지만 응답이 없는 경우
      //     console.error("응답 없음:", error.request);
      //   } else {
      //     // 요청 생성 중 문제 발생
      //     console.error("요청 오류:", error.message);
      //   }

      return false;
    }
  },

  // 읽지 않은 알림 개수 조회
  getUnreadCount: async (memberId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/solpick/noti/count/unread/${memberId}`,
        {
          headers: authApi.getAuthHeader(),
        }
      );
      return response.data;
    } catch (error) {
      console.error("읽지 않은 알림 개수 가져오기 실패:", error);
      return "?"; // 에러 발생 시 ?으로 표시
    }
  },
};
