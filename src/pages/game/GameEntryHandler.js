import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSelectedRecipe } from "../../api/GameApi";
import { resetGameData } from "../../utils/game/storageUtils";

/**
 * 게임 진입 처리 컴포넌트
 * 사용자가 이전에 레시피를 선택했는지 확인하고 적절한 페이지로 이동시킵니다.
 */
const GameEntryHandler = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로그인 상태 및 레시피 선택 여부 확인
    const checkGameEntry = async () => {
      try {
        // 로그인 상태 확인
        const token = localStorage.getItem("token");
        if (!token) {
          // 로그인되지 않은 경우 로그인 페이지로 이동
          console.log("로그인되지 않았습니다. 로그인 페이지로 이동합니다.");
          navigate("/login");
          return;
        }

        // 현재 로그인한 사용자 정보 확인
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.memberId) {
          console.log("사용자 정보가 없습니다. 로그인 페이지로 이동합니다.");
          navigate("/login");
          return;
        }

        // 선택한 레시피 확인 (서버에서 가져오기)
        const response = await getSelectedRecipe();

        // 로컬 스토리지의 게임 데이터를 초기화 (이전 사용자 데이터 제거)
        // resetGameData();

        if (response && response.recipeId) {
          // 서버에 저장된 레시피가 있는 경우, 이를 사용
          console.log("서버에 저장된 레시피를 사용합니다:", response.recipeId);
          // 이 시점에 다시 로컬 스토리지에 저장할 필요는 없음 - API 호출 시 자동으로 처리됨
          navigate("/game/intro");
        } else {
          // 레시피를 선택하지 않은 경우 레시피 선택 페이지로 이동
          console.log(
            "레시피를 선택하지 않았습니다. 레시피 선택 페이지로 이동합니다."
          );
          navigate("/game/init");
        }
      } catch (error) {
        console.error("게임 진입 처리 중 오류 발생:", error);
        // 오류 발생 시 로컬 스토리지 데이터 초기화 및 레시피 선택 페이지로 이동
        resetGameData();
        navigate("/game/init");
      } finally {
        setLoading(false);
      }
    };

    checkGameEntry();
  }, [navigate]);

  // 로딩 중에는 로딩 표시
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // 실제 렌더링은 다른 페이지로 리다이렉트되므로 여기서는 null 반환
  return null;
};

export default GameEntryHandler;
