import { useMemo } from "react";
import GameStorageItem from "./GameStorageItem";
import "./GameStorageList.css";
import recipes from "./RecipeData"; // 클라이언트 측 레시피 데이터 import

const GameStorageList = ({ completedRecipes = [], onRecipeClick }) => {
  // 완성된 레시피를 날짜별로 그룹화
  const groupedRecipes = useMemo(() => {
    // 오늘, 어제 날짜 계산
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // 날짜를 YYYY. MM. DD. 형식으로 변환하는 함수
    function formatYMD(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}. ${month}. ${day}.`;
    }

    const todayString = formatYMD(today);
    const yesterdayString = formatYMD(yesterday);

    // 날짜별로 그룹화
    const groups = {};

    completedRecipes.forEach((recipe) => {
      // ISO 문자열 날짜를 Date 객체로 변환
      const date = new Date(recipe.completionDate);

      // 날짜 포맷팅
      const dateString = formatYMD(date);

      // 표시용 날짜 결정
      let displayDate;

      if (dateString === todayString) {
        displayDate = "오늘";
      } else if (dateString === yesterdayString) {
        displayDate = "어제";
      } else {
        // YYYY. MM. DD. 형식으로 표시
        displayDate = dateString;
      }

      // 그룹에 추가
      if (!groups[displayDate]) {
        groups[displayDate] = [];
      }

      // 시간 포맷팅 (HH:MM)
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const timeString = `${hours}:${minutes}`;

      // 클라이언트 측 레시피 데이터에서 상세 정보 가져오기
      const clientRecipeData = recipes.find((r) => r.id === recipe.recipeId);

      const recipeInfo = {
        name: clientRecipeData?.name || "알 수 없는 레시피",
        imagePath: clientRecipeData?.imagePath || null,
        ingredients: clientRecipeData?.ingredients || [],
        points: clientRecipeData?.points || 0,
      };

      groups[displayDate].push({
        ...recipe,
        ...recipeInfo,
        formattedTime: dateString + " " + timeString,
      });
    });

    // 날짜별로 정렬 (최신순)
    return Object.entries(groups).sort((a, b) => {
      if (a[0] === "오늘") return -1;
      if (b[0] === "오늘") return 1;
      if (a[0] === "어제") return -1;
      if (b[0] === "어제") return 1;

      // 날짜 형식일 경우 역순으로 정렬
      const dateA = a[0].split(". ").map((n) => parseInt(n || "0"));
      const dateB = b[0].split(". ").map((n) => parseInt(n || "0"));

      // 연도 비교
      if (dateA[0] !== dateB[0]) return dateB[0] - dateA[0];
      // 월 비교
      if (dateA[1] !== dateB[1]) return dateB[1] - dateA[1];
      // 일 비교
      return dateB[2] - dateA[2];
    });
  }, [completedRecipes]);

  if (completedRecipes.length === 0) {
    return <div className="storage-empty">완성한 레시피가 없습니다.</div>;
  }

  return (
    <div className="storage-list">
      {groupedRecipes.map(([date, recipes], groupIndex) => (
        <div key={date} className="storage-group">
          <div className="storage-date pixel-font-kr">{date}</div>
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="storage-item-wrapper"
              onClick={() => onRecipeClick && onRecipeClick(recipe)}
            >
              <GameStorageItem
                recipeName={recipe.name}
                imagePath={recipe.imagePath}
                pointAmount={recipe.pointAmount || recipe.points}
                timestamp={recipe.formattedTime}
                ingredients={recipe.ingredients}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameStorageList;
