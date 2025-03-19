import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 hook 추가
import "./GameMain.css";
import GameBackground from "./GameBackground";
import catPlayground from "../../assets/game/catPlayground.svg";
import dailyGame from "../../assets/game/dailyGame.svg";
import storage from "../../assets/game/storage.svg";
import LevelStatus from "./LevelStatus";
import DiscoveredIngredients from "./DiscoveredIngredients";
import PixelModal from "./PixelModal";
import {
  getGameState,
  updateGameState,
  discoverIngredient,
  getSelectedRecipe,
  getDiscoveredIngredients,
  resetGameData, // resetGameData API 함수 추가
} from "../../api/GameApi";
import recipes from "./RecipeData";

/**
 * 게임 메인 화면 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {Function} props.onDailyGame - 데일리 게임 버튼 클릭 핸들러
 * @param {Function} props.onStorage - 보관함 버튼 클릭 핸들러
 * @returns {JSX.Element} 게임 메인 화면
 */
const GameMain = ({ onDailyGame, onStorage }) => {
  // navigate hook 추가
  const navigate = useNavigate();

  // 게임 상태 관리
  const [gameState, setGameState] = useState({
    level: 1,
    currentExp: 0,
    energy: 100,
    food: 10,
    ingredientsCount: 0,
  });

  // 선택한 레시피 관리
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // 로딩 상태 관리
  const [loading, setLoading] = useState(true);

  // 모달 상태 관리
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    buttons: [],
  });

  // 모달 닫기 함수
  const closeModal = () => {
    setModalConfig({
      isOpen: false,
      title: "",
      message: "",
      buttons: [],
    });
  };

  // 컴포넌트 마운트 시 게임 데이터 로드
  useEffect(() => {
    const loadGameData = async () => {
      try {
        setLoading(true);

        // 1. 게임 상태 로드
        const gameStateData = await getGameState();
        if (gameStateData) {
          console.log("Game state loaded:", gameStateData);
          setGameState(gameStateData);
        } else {
          console.error("Failed to load game state");
        }

        // 2. 선택한 레시피 정보 로드
        const recipeResponse = await getSelectedRecipe();
        if (recipeResponse && recipeResponse.recipeId) {
          const recipeId = recipeResponse.recipeId;
          const recipe = recipes.find((r) => r.id === recipeId);
          if (recipe) {
            setSelectedRecipe(recipe);
          }
        }
      } catch (error) {
        console.error("게임 데이터 로드 중 오류 발생:", error);
        // 오류 모달 표시
        setModalConfig({
          isOpen: true,
          title: "오류 발생",
          message: "게임 데이터를 불러오는 중 오류가 발생했습니다.",
          buttons: [
            { text: "확인", onClick: () => closeModal(), type: "primary" },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    loadGameData();
  }, []);

  /**
   * 사료 주기 기능
   * 사료를 소모하여 경험치와 에너지 증가
   */
  const feedCat = async () => {
    // 사료 확인
    if (gameState.food < 1) {
      setModalConfig({
        isOpen: true,
        title: "사료 부족",
        message: "사료가 부족합니다!",
        buttons: [
          { text: "확인", onClick: () => closeModal(), type: "primary" },
        ],
      });
      return;
    }

    // 레벨별 최대 경험치 설정
    const maxExp = gameState.level * 100;

    // 사료 주기 (경험치 10 증가, 에너지 100 증가)
    const expGain = 10;
    const energyGain = 100;

    // 상태 업데이트 준비
    const newGameState = {
      ...gameState,
      food: gameState.food - 1,
      energy: gameState.energy + energyGain,
      currentExp: gameState.currentExp + expGain,
    };

    // 레벨업 체크
    let isLevelUp = false;
    if (newGameState.currentExp >= maxExp && newGameState.level < 5) {
      isLevelUp = true;
      newGameState.level += 1;
      newGameState.currentExp = 0;
    } else if (newGameState.currentExp >= maxExp) {
      // 최대 레벨인 경우 최대 경험치로 고정
      newGameState.currentExp = maxExp;
    }

    try {
      // 서버에 게임 상태 업데이트
      const updatedState = await updateGameState(newGameState);
      if (updatedState) {
        console.log("Updated game state:", updatedState);
        // 서버에서 반환한 상태로 업데이트
        setGameState(updatedState);
      } else {
        // 서버 응답이 없으면 로컬 상태만 업데이트
        console.warn("No response from server, updating local state only");
        setGameState(newGameState);
      }

      // 밥 주기 성공 모달 표시
      setModalConfig({
        isOpen: true,
        title: "밥 주기 성공",
        message: `사료를 주었습니다!\n에너지 ${energyGain} 증가\n경험치 ${expGain} 증가`,
        buttons: [
          {
            text: "확인",
            onClick: () => {
              closeModal();

              // 레벨업 발생 시 추가 모달 표시
              if (isLevelUp) {
                setTimeout(() => {
                  setModalConfig({
                    isOpen: true,
                    title: "Level Up!",
                    message: `축하합니다!\n레벨 ${newGameState.level}로 성장했습니다!`,
                    buttons: [
                      {
                        text: "확인",
                        onClick: () => closeModal(),
                        type: "primary",
                      },
                    ],
                  });
                }, 300);
              } else if (
                newGameState.level >= 5 &&
                newGameState.currentExp >= maxExp
              ) {
                // 최대 레벨에 도달한 경우 알림
                setTimeout(() => {
                  setModalConfig({
                    isOpen: true,
                    title: "최대 레벨",
                    message: "이미 최대 레벨에 도달했습니다!",
                    buttons: [
                      {
                        text: "확인",
                        onClick: () => closeModal(),
                        type: "primary",
                      },
                    ],
                  });
                }, 300);
              }
            },
            type: "primary",
          },
        ],
      });
    } catch (error) {
      console.error("밥 주기 처리 중 오류 발생:", error);
      setModalConfig({
        isOpen: true,
        title: "오류 발생",
        message: "밥 주기 처리 중 오류가 발생했습니다.",
        buttons: [
          { text: "확인", onClick: () => closeModal(), type: "primary" },
        ],
      });
    }
  };

  // GameMain.js 파일의 exploreIngredients 함수 수정

  /**
   * 탐색하기 기능
   * 에너지를 소모하여 식재료 또는 사료 획득
   */
  const exploreIngredients = async () => {
    // 에너지 확인 (탐색에는 에너지 50 필요)
    if (gameState.energy < 50) {
      setModalConfig({
        isOpen: true,
        title: "에너지 부족",
        message: "탐색을 위한 에너지가 부족합니다!",
        buttons: [
          { text: "확인", onClick: () => closeModal(), type: "primary" },
        ],
      });
      return;
    }

    try {
      // 상태 업데이트 준비 (에너지 소모)
      const newGameState = {
        ...gameState,
        energy: gameState.energy - 50,
      };

      // 레벨별 식재료 획득 확률 (레벨이 높을수록 식재료를 얻을 확률 증가)
      const levelConfig = {
        1: { foodRatio: 90, ingredientRatio: 10 },
        2: { foodRatio: 80, ingredientRatio: 20 },
        3: { foodRatio: 70, ingredientRatio: 30 },
        4: { foodRatio: 60, ingredientRatio: 40 },
        5: { foodRatio: 50, ingredientRatio: 50 },
      };

      const config = levelConfig[gameState.level] || levelConfig[1];

      // 획득 아이템 결정 (확률에 따라 사료 또는 식재료)
      const randomValue = Math.random() * 100; // 0부터 100 사이 랜덤 값

      if (randomValue < config.foodRatio) {
        // 사료 획득
        newGameState.food += 1;

        // 서버에 게임 상태 업데이트
        const updatedState = await updateGameState(newGameState);
        if (updatedState) {
          setGameState(updatedState);
        } else {
          setGameState(newGameState); // 서버 응답 없을 경우 로컬 상태만 업데이트
        }

        // 결과 모달 표시
        setModalConfig({
          isOpen: true,
          title: "탐색 성공",
          message: `사료 1개를 획득했습니다.\n(식재료 획득 확률: ${config.ingredientRatio}%)`,
          buttons: [
            { text: "확인", onClick: () => closeModal(), type: "primary" },
          ],
        });
      } else {
        // 식재료 획득 처리
        // 선택한 레시피가 없는 경우 처리
        if (!selectedRecipe || !selectedRecipe.id) {
          // 레시피 선택이 안된 경우 사료 지급
          newGameState.food += 1;

          const updatedState = await updateGameState(newGameState);
          if (updatedState) {
            setGameState(updatedState);
          } else {
            setGameState(newGameState);
          }

          setModalConfig({
            isOpen: true,
            title: "레시피 미선택",
            message: "선택된 레시피가 없어서 사료 1개를 획득했습니다.",
            buttons: [
              { text: "확인", onClick: () => closeModal(), type: "primary" },
            ],
          });
          return;
        }

        try {
          // 현재 식재료 상태 가져오기
          const ingredientsData = await getDiscoveredIngredients(
            selectedRecipe.id
          );

          // 1. 미발견 식재료 필터링
          const undiscoveredIngredients = ingredientsData.filter(
            (ing) => !ing.discovered
          );

          // 2. 발견됐지만 필요 수량에 미달하는 식재료 필터링
          const incompleteIngredients = ingredientsData.filter(
            (ing) => ing.discovered && ing.count < ing.requiredQuantity
          );

          // 3. 선택 가능한 식재료 결정
          let targetIngredients;
          let searchMessage = "";

          if (undiscoveredIngredients.length > 0) {
            // 미발견 식재료가 있으면 우선 선택
            targetIngredients = undiscoveredIngredients;
            searchMessage = "아직 발견하지 못한 식재료를 찾고 있습니다...";
          } else if (incompleteIngredients.length > 0) {
            // 모든 식재료가 발견됐지만 수량이 부족한 식재료 선택
            targetIngredients = incompleteIngredients;
            searchMessage = "발견한 식재료의 수량을 채우고 있습니다...";
          } else {
            // 모든 식재료가 필요 수량을 충족한 경우
            // 서버에 게임 상태만 업데이트하고 사료 지급
            newGameState.food += 1;

            const updatedState = await updateGameState(newGameState);
            if (updatedState) {
              setGameState(updatedState);
            } else {
              setGameState(newGameState);
            }

            setModalConfig({
              isOpen: true,
              title: "탐색 완료",
              message:
                "모든 식재료를 충분히 모았습니다! 사료 1개를 획득했습니다.",
              buttons: [
                { text: "확인", onClick: () => closeModal(), type: "primary" },
              ],
            });
            return;
          }

          // 4. 선택 가능한 식재료 중 하나를 랜덤 선택
          const randomIndex = Math.floor(
            Math.random() * targetIngredients.length
          );
          const selectedIngredient = targetIngredients[randomIndex];

          console.log(
            `선택된 식재료: ${selectedIngredient.ingredientName}, 발견여부: ${selectedIngredient.discovered}, 현재수량: ${selectedIngredient.count}, 필요수량: ${selectedIngredient.requiredQuantity}`
          );

          // 5. 서버에 식재료 발견 처리 요청
          const discoveryResult = await discoverIngredient(
            selectedRecipe.id,
            selectedIngredient.ingredientName,
            selectedRecipe.points // 레시피 포인트 전달
          );

          // 디버깅 로그 추가
          console.log("식재료 발견 결과:", discoveryResult);

          // discoveryResult에 ingredientName 추가 (API 응답에 포함되지 않은 경우)
          if (!discoveryResult.ingredientName) {
            discoveryResult.ingredientName = selectedIngredient.ingredientName;
          }

          // 게임 상태 업데이트 (ingredientsCount 증가)
          newGameState.ingredientsCount += 1;

          // 서버에 게임 상태 업데이트
          const updatedState = await updateGameState(newGameState);
          if (updatedState) {
            setGameState(updatedState);
          } else {
            setGameState(newGameState);
          }

          // 결과 처리
          if (discoveryResult.isRecipeCompleted) {
            // 레시피 완성 성공 모달 표시
            const recipePoints = selectedRecipe.points || 5000;

            setModalConfig({
              isOpen: true,
              title: "레시피 완성!",
              message: `축하합니다! 모든 식재료를 발견하여 레시피를 완성했습니다!\n${recipePoints} 포인트를 획득했습니다.`,
              buttons: [
                {
                  text: "확인",
                  onClick: async () => {
                    closeModal();

                    // 게임 데이터 초기화 진행
                    try {
                      await resetGameData();

                      // 초기화 성공 후 레시피 선택 페이지로 이동
                      setModalConfig({
                        isOpen: true,
                        title: "새 레시피 선택",
                        message: "새로운 레시피를 선택해 주세요!",
                        buttons: [
                          {
                            text: "확인",
                            onClick: () => {
                              closeModal();
                              navigate("/game/init"); // 레시피 선택 페이지로 이동
                            },
                            type: "primary",
                          },
                        ],
                      });
                    } catch (error) {
                      console.error("게임 데이터 초기화 중 오류 발생:", error);
                      setModalConfig({
                        isOpen: true,
                        title: "오류 발생",
                        message: "게임 데이터 초기화 중 오류가 발생했습니다.",
                        buttons: [
                          {
                            text: "확인",
                            onClick: () => closeModal(),
                            type: "primary",
                          },
                        ],
                      });
                    }
                  },
                  type: "primary",
                },
              ],
            });
          } else if (discoveryResult.isNewlyDiscovered) {
            // 새로운 식재료 발견
            setModalConfig({
              isOpen: true,
              title: "새로운 발견!",
              message: `새로운 식재료 '${discoveryResult.ingredientName}'을(를) 발견했습니다!\n(수량: ${discoveryResult.newCount})`,
              buttons: [
                { text: "확인", onClick: () => closeModal(), type: "primary" },
              ],
            });
          } else {
            // 기존 식재료 추가 획득
            setModalConfig({
              isOpen: true,
              title: "식재료 획득",
              message: `'${discoveryResult.ingredientName}'을(를) 1개 더 발견했습니다.\n(현재 수량: ${discoveryResult.newCount})`,
              buttons: [
                { text: "확인", onClick: () => closeModal(), type: "primary" },
              ],
            });
          }
        } catch (error) {
          console.error("식재료 발견 처리 중 오류 발생:", error);
          // 오류 발생 시 에너지만 소모하고 메시지 표시
          const updatedState = await updateGameState(newGameState);
          if (updatedState) {
            setGameState(updatedState);
          } else {
            setGameState(newGameState);
          }

          setModalConfig({
            isOpen: true,
            title: "오류 발생",
            message: "식재료 발견 처리 중 오류가 발생했습니다.",
            buttons: [
              { text: "확인", onClick: () => closeModal(), type: "primary" },
            ],
          });
        }
      }
    } catch (error) {
      console.error("탐색 처리 중 오류 발생:", error);
      setModalConfig({
        isOpen: true,
        title: "오류 발생",
        message: "탐색 처리 중 오류가 발생했습니다.",
        buttons: [
          { text: "확인", onClick: () => closeModal(), type: "primary" },
        ],
      });
    }
  };

  return (
    <div className="game-main-container">
      <GameBackground />

      <div className="game-main-content">
        <div className="game-menu-group">
          <div className="daily-game" onClick={onDailyGame}>
            <img src={dailyGame} alt="Daily Game" className="daily-game-icon" />
            <p className="pixel-font-kr">사료 받기</p>
          </div>
          <div className="storage" onClick={onStorage}>
            <img src={storage} alt="Storage" className="storage-icon" />
            <p className="pixel-font-kr">보관함</p>
          </div>
        </div>

        <div className="cat-playground-container">
          <img
            src={catPlayground}
            alt="Cat Playground"
            className="cat-playground"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* 게임 상태를 props로 전달 */}
            <LevelStatus
              gameState={gameState}
              onFeed={feedCat}
              onExplore={exploreIngredients}
            />

            {/* DiscoveredIngredients는 이제 GameMain의 selectedRecipe 정보를 props로 받음 */}
            <DiscoveredIngredients
              selectedRecipeId={selectedRecipe ? selectedRecipe.id : null}
              ingredientsCount={gameState.ingredientsCount}
            />
          </>
        )}

        {/* 픽셀 스타일 모달 */}
        <PixelModal
          isOpen={modalConfig.isOpen}
          title={modalConfig.title}
          message={modalConfig.message}
          buttons={modalConfig.buttons}
          onClose={closeModal}
        />
      </div>
    </div>
  );
};

export default GameMain;
