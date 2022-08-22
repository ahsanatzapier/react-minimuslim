import "./product-card.styles.scss";
import Button from "../button/button.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { useAlert } from "react-alert";

const ProductCard = ({ product }) => {
  const alert = useAlert();
  const { name, price, imageUrl } = product;
  const { addItemtoCart } = useContext(CartContext);

  const addProductToCart = () => addItemtoCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <Button
        buttonType="inverted"
        onClick={() => {
          addItemtoCart(product);
          alert.success("Item added to cart");
        }}
      >
        Add Item
      </Button>
    </div>
  );
};

export default ProductCard;
