import { Link } from "react-router-dom";
import "./directory-item.styles.scss";

const DirectoryItem = ({ category }) => {
  const { image, title } = category;

  return (
    <div className="directory-item-container">
      <div
        className="background-image"
        style={{ "background-image": `url(${image})` }}
      />

      <Link className="body" to={`shop/${title.toLowerCase()}`}>
        <div>
          <h2>{title}</h2>
          <p className="subtitle">Shop Now</p>
        </div>
      </Link>
    </div>
  );
};

export default DirectoryItem;
