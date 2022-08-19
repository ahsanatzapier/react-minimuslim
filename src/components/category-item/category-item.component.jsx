import "./category-item.styles.scss";

const CategoryItem = ({ category }) => {
  const { image, title } = category;

  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{ "background-image": `url(${image})` }}
      />

      <div className="category-body-container">
        <h2>{title}</h2>
        <p className="subtitle">Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
