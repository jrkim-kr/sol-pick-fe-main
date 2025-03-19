import React, { useState, useEffect, useCallback, useRef } from "react";
import "./DailyGameMain.css";
import PixelModal from "./PixelModal";

// 식재료 정보를 담은 배열 - 픽셀 아트 테마에 맞는 색상으로 수정
const foodIngredients = [
  { id: 1, name: "토마토", color: "#d95763", emoji: "🍅" },
  { id: 2, name: "양파", color: "#df7126", emoji: "🧅" },
  { id: 3, name: "당근", color: "#fc9838", emoji: "🥕" },
  { id: 4, name: "감자", color: "#8f563b", emoji: "🥔" },
  { id: 5, name: "버섯", color: "#c0c0c0", emoji: "🍄" },
  { id: 6, name: "파", color: "#63c74d", emoji: "🧄" },
  { id: 7, name: "계란", color: "#feae34", emoji: "🥚" },
  { id: 8, name: "밥", color: "#f4f4f4", emoji: "🍚" },
  { id: 9, name: "소고기", color: "#be4a2f", emoji: "🥩" },
  { id: 10, name: "치즈", color: "#fee761", emoji: "🧀" },
  { id: 11, name: "마늘", color: "#e8e8e8", emoji: "🧄" },
  { id: 12, name: "브로콜리", color: "#2ce8f5", emoji: "🥦" },
  { id: 13, name: "고추", color: "#c0271b", emoji: "🌶️" },
  { id: 14, name: "오이", color: "#3db01c", emoji: "🥒" },
  { id: 15, name: "생선", color: "#88abdb", emoji: "🐟" },
];

/**
 * 픽셀 아트 스타일의 카드 뒤집기 게임 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {Function} props.onGameExit - 게임 종료 시 호출할 함수
 * @param {Function} props.onEarnFood - 사료 획득 시 호출할 함수
 * @returns {JSX.Element} 카드 뒤집기 게임 컴포넌트
 */
const DailyGameMain = ({ onGameExit, onEarnFood }) => {
  // 게임에 사용될 카드들의 상태
  const [cards, setCards] = useState([]);
  // 현재 선택된 카드들
  const [flippedCards, setFlippedCards] = useState([]);
  // 이미 짝을 맞춘 카드들
  const [matchedPairs, setMatchedPairs] = useState([]);
  // 게임 시작 시간
  const [startTime, setStartTime] = useState(null);
  // 게임 종료 시간
  const [endTime, setEndTime] = useState(null);
  // 시도 횟수
  const [moves, setMoves] = useState(0);
  // 현재 게임 레벨 (1~5)
  const [currentLevel, setCurrentLevel] = useState(1);
  // 누적 보상 (사료 개수)
  const [totalReward, setTotalReward] = useState(0);
  // 레벨 완료 상태
  const [levelCompleted, setLevelCompleted] = useState(false);
  // 게임 로딩 상태
  const [isLoading, setIsLoading] = useState(true);
  // 뒤집기 작업 중 상태
  const isFlipping = useRef(false);

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

  // 게임 초기화 함수
  const initializeGame = useCallback(
    (resetLevel = false) => {
      // 로딩 상태 설정
      setIsLoading(true);

      // 레벨을 리셋하려면 1로 설정, 아니면 현재 레벨 유지
      if (resetLevel) {
        setCurrentLevel(1);
        setTotalReward(0);
      }

      // 현재 레벨에 따라 카드 쌍 개수 조정 (레벨별 행과 열 지정)
      const levelPairs = {
        1: 3, // 레벨 1: 6장 (3쌍) - 3행 2열
        2: 4, // 레벨 2: 8장 (4쌍) - 4행 2열
        3: 8, // 레벨 3: 16장 (8쌍) - 4행 4열
        4: 10, // 레벨 4: 20장 (10쌍) - 5행 4열
        5: 12, // 레벨 5: 24장 (12쌍) - 6행 4열
      };

      const pairsForLevel = levelPairs[currentLevel];

      // 난이도에 맞게 식재료 선택 및 섞기
      const shuffledIngredients = [...foodIngredients]
        .sort(() => Math.random() - 0.5)
        .slice(0, pairsForLevel);

      // 각 식재료마다 두 장의 카드를 만들어 배열에 추가
      let newCards = [];
      shuffledIngredients.forEach((ingredient) => {
        // 첫 번째 카드
        newCards.push({
          id: ingredient.id * 2 - 1,
          ingredientId: ingredient.id,
          name: ingredient.name,
          color: ingredient.color,
          emoji: ingredient.emoji,
          isFlipped: false,
          isMatched: false,
        });

        // 두 번째 카드 (짝)
        newCards.push({
          id: ingredient.id * 2,
          ingredientId: ingredient.id,
          name: ingredient.name,
          color: ingredient.color,
          emoji: ingredient.emoji,
          isFlipped: false,
          isMatched: false,
        });
      });

      // 카드 섞기
      newCards.sort(() => Math.random() - 0.5);

      // 상태 초기화
      setCards(newCards);
      setFlippedCards([]);
      setMatchedPairs([]);
      setMoves(0);
      setStartTime(Date.now());
      setEndTime(null);
      setLevelCompleted(false);

      // 카드를 생성한 후 로딩 상태 해제
      setTimeout(() => {
        setIsLoading(false);
      }, 800); // 간단한 로딩 효과를 위한 지연 시간
    },
    [currentLevel]
  );

  // 컴포넌트 마운트 시 게임 초기화
  useEffect(() => {
    initializeGame(true);
  }, []);

  // 카드 클릭 처리 함수
  const handleCardClick = (id) => {
    // 로딩 중이거나 뒤집는 중이면 클릭 무시
    if (isLoading || isFlipping.current) return;

    // 이미 짝을 맞춘 카드거나, 이미 뒤집혀 있는 카드는 무시
    if (
      matchedPairs.includes(id) ||
      flippedCards.includes(id) ||
      flippedCards.length >= 2
    ) {
      return;
    }

    // 뒤집기 작업 중 상태 설정
    isFlipping.current = true;

    // 카드 뒤집기
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // 두 장의 카드가 선택된 경우
    if (newFlippedCards.length === 2) {
      // 시도 횟수 증가
      setMoves(moves + 1);

      // 선택된 두 카드 정보 가져오기
      const firstCard = cards.find((card) => card.id === newFlippedCards[0]);
      const secondCard = cards.find((card) => card.id === newFlippedCards[1]);

      // 두 카드의 식재료가 같은지 확인 (짝 맞추기)
      if (firstCard.ingredientId === secondCard.ingredientId) {
        // 짝을 맞춘 경우
        const newMatchedPairs = [...matchedPairs, firstCard.id, secondCard.id];
        setMatchedPairs(newMatchedPairs);
        setFlippedCards([]);
        isFlipping.current = false;

        // 모든 카드의 짝을 맞췄는지 확인
        if (newMatchedPairs.length === cards.length) {
          // 게임 종료
          setEndTime(Date.now());

          // 현재 레벨에 해당하는 보상 지급
          const levelReward = currentLevel;
          const newTotalReward = totalReward + levelReward;
          setTotalReward(newTotalReward);

          // 부모 컴포넌트에 보상 전달 (있다면)
          if (onEarnFood) {
            onEarnFood(levelReward);
          }

          // 레벨 클리어 표시
          setLevelCompleted(true);
        }
      } else {
        // 짝이 맞지 않는 경우, 잠시 후 카드를 다시 뒤집기
        setTimeout(() => {
          setFlippedCards([]);
          isFlipping.current = false;
        }, 800);
      }
    } else {
      // 첫 번째 카드만 뒤집은 경우, 뒤집기 작업 완료
      isFlipping.current = false;
    }
  };

  // 다음 레벨로 진행하는 함수
  const goToNextLevel = () => {
    if (currentLevel < 5) {
      // 다음 레벨로 설정
      const nextLevel = currentLevel + 1;
      setCurrentLevel(nextLevel);

      // 다음 레벨 시작 전에 모달 닫기
      setEndTime(null);
      setLevelCompleted(false);
    }
  };

  // 게임 완전 재시작 함수
  const restartFullGame = () => {
    // 게임 재시작 확인 모달 (옵션)
    setModalConfig({
      isOpen: true,
      title: "게임 재시작",
      message:
        "정말 처음부터 다시 시작하시겠습니까?\n모든 진행 상황이 초기화됩니다.",
      buttons: [
        {
          text: "재시작",
          onClick: () => {
            closeModal();
            initializeGame(true);
          },
          type: "primary",
        },
        { text: "취소", onClick: () => closeModal(), type: "secondary" },
      ],
    });
  };

  // 게임 나가기 함수
  const exitGame = () => {
    if (onGameExit) {
      onGameExit(totalReward);
    }
  };

  // 레벨이 변경되면 게임 재시작
  useEffect(() => {
    if (currentLevel > 0) {
      initializeGame(false);
    }
  }, [currentLevel, initializeGame]);

  // 경과 시간 계산
  const getElapsedTime = () => {
    if (!startTime) return "00:00";

    const elapsed = endTime ? endTime - startTime : Date.now() - startTime;
    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);

    return `${minutes.toString().padStart(2, "0")}:${(seconds % 60)
      .toString()
      .padStart(2, "0")}`;
  };

  // 레벨 단계 렌더링
  const renderLevelSteps = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <div
        key={index}
        className={`level-step ${index + 1 <= currentLevel ? "active" : ""}`}
      >
        {index + 1}
      </div>
    ));
  };

  // 로딩 화면 렌더링
  const renderLoading = () => (
    <div className="loading-container pixel-font">
      <div className="loading-text pixel-font">
        LOADING LEVEL {currentLevel}...
      </div>
      <div className="loading-dots">
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
    </div>
  );

  return (
    <div className="daily-game-main-container pixel-font">
      {/* 게임 정보 및 컨트롤 */}
      <div className="game-info">
        <h2 className="pixel-font">LEVEL {currentLevel}/5</h2>
        <div className="level-progress">{renderLevelSteps()}</div>
        <div className="reward-info">
          <h3 className="pixel-font-kr">누적 보상: 🐱 사료 x {totalReward}</h3>
        </div>
      </div>

      <div className="game-controls">
        <button onClick={restartFullGame} className="restart-btn pixel-font">
          RESTART
        </button>
        <button onClick={exitGame} className="exit-btn pixel-font">
          EXIT
        </button>
      </div>

      {/* 로딩 상태에 따라 로딩 화면 또는 카드 그리드 표시 */}
      {isLoading ? (
        renderLoading()
      ) : (
        <div className={`card-grid level-${currentLevel}`}>
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`card ${
                flippedCards.includes(card.id) || matchedPairs.includes(card.id)
                  ? "flipped"
                  : ""
              } ${matchedPairs.includes(card.id) ? "matched" : ""}`}
            >
              <div className="card-inner">
                {/* 카드 앞면 (뒤집혔을 때) */}
                <div
                  className="card-front"
                  style={{ backgroundColor: card.color }}
                >
                  <div className="card-icon">
                    <span>{card.emoji}</span>
                  </div>
                  <p className="card-name pixel-font">{card.name}</p>
                </div>

                {/* 카드 뒷면 */}
                <div className="card-back">
                  <div className="card-question">?</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 게임 완료 모달 */}
      {endTime && (
        <div className="modal-overlay">
          <div className="game-complete pixel-font">
            <h2 className="pixel-font-kr">LEVEL {currentLevel} CLEAR!</h2>
            <p className="pixel-font-kr">총 시도 횟수: {moves}회</p>
            <p className="pixel-font-kr">소요 시간: {getElapsedTime()}</p>
            <p className="reward-earned pixel-font-kr">
              보상 획득: 🐱 사료 x {currentLevel}
            </p>

            {currentLevel < 5 ? (
              <button
                onClick={goToNextLevel}
                className="next-level-btn pixel-font"
              >
                NEXT LEVEL
              </button>
            ) : (
              <div className="game-finished">
                <h3 className="pixel-font-kr">ALL LEVELS CLEAR!</h3>
                <p className="pixel-font-kr">
                  축하합니다! 모든 레벨을 클리어했습니다!
                </p>
                <div className="game-finished-buttons">
                  <button
                    onClick={restartFullGame}
                    className="restart-btn pixel-font"
                  >
                    RESTART
                  </button>
                  <button
                    onClick={exitGame}
                    className="exit-game-btn pixel-font"
                  >
                    EXIT
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
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
  );
};

export default DailyGameMain;
