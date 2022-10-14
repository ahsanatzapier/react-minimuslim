import { useDispatch, useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart } from "../../store/cart/cart.action";

import Button from "../button/button.component";

import "./product-card.styles.scss";

// import { useAlert } from "react-alert";

const ProductCard = ({ product }) => {
  // const alert = useAlert();
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <Button
        buttonType="inverted"
        // alert.success("Item added to cart");
        onClick={addProductToCart}
      >
        Add Item
      </Button>
    </div>
  );
};

export default ProductCard;
