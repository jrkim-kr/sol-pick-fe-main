import axios from 'axios';
import { authApi } from './AuthApi';
import { BASE_URL } from '../config';

export const recipeApi = {
    getLikedRecipes: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/member/recipe/likes`, {
                headers: {
                    ...authApi.getAuthHeader()
                }
            });

            if (response.status === 204) {
                return [];
            }

            // 응답 데이터 변환 (thumbnailUrl을 image로 변경하고 URL 정제)
            return response.data.map(recipe => ({
                id: recipe.recipe_id,
                name: recipe.recipe_name,
                image: recipeApi.cleanImageUrl(recipe.thumbnail_url)
            }));
        } catch (error) {
            console.error('좋아요한 레시피 목록 조회 오류:', error);

            // 개발 모드에서는 목업 데이터 반환
            if (process.env.NODE_ENV === 'development') {
                return getMockLikedRecipes();
            }
            throw error;
        }
    },

    // 레시피 스텝 정보를 가져오는 함수
    getRecipeSteps: async (recipeId) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/member/recipe/${recipeId}/steps`, {
                headers: {
                    ...authApi.getAuthHeader()
                }
            });

            if (response.status === 204) {
                return [];
            }

            // 응답 데이터 변환
            return response.data.map((step, index) => ({
                id: step.stepId,
                description: step.description,
                image: step.imgUrl ? recipeApi.cleanImageUrl(step.imgUrl) : null,
                time: step.time,
                sort: step.sort
            })).sort((a, b) => a.sort - b.sort); // 순서대로 정렬
        } catch (error) {
            console.error('레시피 스텝 조회 오류:', error);

            // 개발 모드에서는 목업 데이터 반환
            if (process.env.NODE_ENV === 'development') {
                return getMockRecipeSteps(recipeId);
            }
            throw error;
        }
    },

    // 이미지 URL 정제 메서드 추가
    cleanImageUrl: (url) => {
        if (!url) return '/images/default-recipe.png'; // 기본 이미지 경로

        // 공백, 개행 문자 제거
        url = url.trim().replace(/\r\n/g, '');

        // HTTPS 강제 전환 (필요시)
        url = url.replace(/^http:/, 'https:');

        // 유효하지 않은 URL일 경우 기본 이미지로 대체
        const isValidUrl = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(url);
        return isValidUrl ? url : '/images/default-recipe.png';
    }
};

// 목업 레시피 데이터 (개발 모드에서 사용)
const getMockLikedRecipes = () => {
    return [
        {
            id: 1,
            name: "토마토 파스타",
            image: "/images/tomato_pasta.jpg"
        },
        {
            id: 2,
            name: "치킨 샐러드",
            image: "/images/chicken_salad.jpg"
        },
        {
            id: 3,
            name: "바나나 팬케이크",
            image: "/images/banana_pancake.jpg"
        }
    ];
};

// 목업 레시피 스텝 데이터 (개발 모드에서 사용)
const getMockRecipeSteps = (recipeId) => {
    const stepsData = {
        1: [
            { id: 101, sort: 1, description: "토마토를 깨끗이 씻어 잘게 썹니다.", image: "/images/tomato_cut.jpg", time: 5 },
            { id: 102, sort: 2, description: "마늘을 다집니다.", image: null, time: 2 },
            { id: 103, sort: 3, description: "올리브 오일을 두른 팬에 마늘을 볶아 향을 냅니다.", image: "/images/garlic_saute.jpg", time: 3 },
            { id: 104, sort: 4, description: "토마토를 넣고 중불에서 5분간 익힙니다.", image: "/images/tomato_cook.jpg", time: 5 },
            { id: 105, sort: 5, description: "파스타면을 삶아 준비합니다.", image: null, time: 8 },
            { id: 106, sort: 6, description: "소스에 삶은 면을 넣고 잘 섞어 완성합니다.", image: "/images/pasta_complete.jpg", time: 2 }
        ],
        2: [
            { id: 201, sort: 1, description: "닭가슴살을 삶아 식힌 후 찢어놓습니다.", image: "/images/chicken_prep.jpg", time: 15 },
            { id: 202, sort: 2, description: "야채를 깨끗이 씻어 먹기 좋게 자릅니다.", image: "/images/veggie_prep.jpg", time: 7 },
            { id: 203, sort: 3, description: "드레싱 재료를 섞어 준비합니다.", image: null, time: 3 },
            { id: 204, sort: 4, description: "모든 재료를 그릇에 담고 드레싱을 뿌려 완성합니다.", image: "/images/salad_complete.jpg", time: 2 }
        ],
        3: [
            { id: 301, sort: 1, description: "바나나를 으깨 반죽에 넣습니다.", image: "/images/mashed_banana.jpg", time: 3 },
            { id: 302, sort: 2, description: "밀가루, 우유, 달걀을 섞어 반죽합니다.", image: "/images/pancake_batter.jpg", time: 5 },
            { id: 303, sort: 3, description: "프라이팬에 반죽을 올려 중불에서 노릇하게 구워냅니다.", image: "/images/cooking_pancake.jpg", time: 7 },
            { id: 304, sort: 4, description: "메이플 시럽이나 꿀을 뿌려 완성합니다.", image: "/images/pancake_complete.jpg", time: 1 }
        ]
    };

    return stepsData[recipeId] || [];
};