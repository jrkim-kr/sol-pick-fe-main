import axios from 'axios';
import { authApi } from './AuthApi';

// API 요청 시 인증 헤더 추가
export const fetchData = async (url, options = {}) => {
    try {
        const response = await axios.get(url, {
            ...options,
            headers: {
                ...options.headers,
                ...authApi.getAuthHeader()
            }
        });

        return response.data;
    } catch (error) {
        // 401 오류 시 로그아웃 처리
        if (error.response && error.response.status === 401) {
            authApi.logout();
            // 로그인 페이지로 리다이렉트
            window.location.href = '/login';
        }
        throw error;
    }
};

// POST 요청을 위한 함수 추가
export const postData = async (url, data, options = {}) => {
    try {
        const response = await axios.post(url, data, {
            ...options,
            headers: {
                ...options.headers,
                ...authApi.getAuthHeader()
            }
        });

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            authApi.logout();
            window.location.href = '/login';
        }
        throw error;
    }
};