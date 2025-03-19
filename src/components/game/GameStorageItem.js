import "./GameStorageItem.css";

const GameStorageItem = ({
  recipeName,
  imagePath,
  pointAmount,
  timestamp,
  ingredients = [],
}) => {
  // 재료 텍스트 생성
  const ingredientsText =
    ingredients.length > 0
      ? ingredients.map((ing) => ing.name).join(", ")
      : "재료 정보 없음";

  return (
    <div className="storage-item">
      <div className="storage-item-image">
        {imagePath ? (
          <img src={imagePath} alt={recipeName} className="recipe-image" />
        ) : (
          <img alt="레시피" className="recipe-icon" />
        )}
      </div>
      <div className="storage-description">
        <p className="game-item-recipe-name pixel-font-kr">{recipeName}</p>
        <p className="recipe-ingredients pixel-font-kr">{ingredientsText}</p>
        <p className="recipe-points pixel-font-kr">포인트 {pointAmount}P</p>
        <p className="storage-item-time pixel-font-kr">{timestamp}</p>
      </div>
    </div>
  );
};

export default GameStorageItem;
