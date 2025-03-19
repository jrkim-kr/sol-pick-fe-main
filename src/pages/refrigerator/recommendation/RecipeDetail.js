import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RecipeDetail.css";
import backArrow from "../../../assets/backArrow.svg";
import Header from "../../../components/common/header/Header";
import Menu from "../../../components/common/menu/Menu";

const RecipeDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipe } = location.state || {};

  if (!recipe) {
    return <p>레시피 정보를 불러올 수 없습니다.</p>;
  }

  return (
    <>
      <Header
        leftIcon={backArrow}
        title={recipe.name} // ✅ 레시피 제목
        onLeftClick={() => window.history.back()}
      />
      <div className="recipe-detail-container">
        <img src={recipe.image} alt={recipe.name} className="recipe-detail-image" />
        
        {/* ✅ 조리 정보 */}
        <div className="recipe-info">
          <p><strong>⏳ 조리 시간:</strong> 30분</p>
          <p><strong>🔥 난이도:</strong> 중급</p>
        </div>

        {/* ✅ 필요한 재료 목록 */}
        <h3>🥕 필요한 재료</h3>
        <ul className="ingredient-list">
          <li>토마토 2개</li>
          <li>파스타 면 200g</li>
          <li>올리브 오일 2큰술</li>
          <li>소금, 후추 약간</li>
        </ul>

        {/* ✅ 조리 단계 */}
        <h3>👨‍🍳 조리 방법</h3>
        <ol className="cooking-steps">
          <li>토마토를 잘게 썬다.</li>
          <li>팬에 올리브 오일을 두르고 토마토를 볶는다.</li>
          <li>파스타 면을 삶고, 팬에 넣어 함께 볶는다.</li>
          <li>소금과 후추로 간을 맞춘 후 완성!</li>
        </ol>

        <Menu />
      </div>
    </>
  );
};

export default RecipeDetail;

