import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { useAlert } from "react-alert";
import "./cart-item.styles.scss";

const CartItem = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;
  const { clearItemFromCart } = useContext(CartContext);
  const alert = useAlert();

  const clearItemHandler = () => {
    clearItemFromCart(cartItem);
    alert.success("Item removed from cart");
  };

  return (
    <div className="cart-item-container">
      <img src={imageUrl} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
      <div className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CartItem;
