import "./IngredientListItem.css";

const IngredientListItem = ({ image, category, name, addDate, onClick }) => {
  return (
    <>
      <div className="ingredient-item-container" onClick={onClick}>
        <img src={image} alt={name} className="ingredient-item-image" />

        <div className="ingredient-item-detail">
          <p className="ingredient-category">{category}</p>
          <h3 className="ingredient-name bold">{name}</h3>
          <p className="ingredient-add-date">{addDate}</p>
        </div>
      </div>
    </>
  );
};
export default IngredientListItem;
