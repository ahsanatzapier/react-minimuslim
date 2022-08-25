import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { useAlert } from "react-alert";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { clearItemFromCart, addItemtoCart, removeItemToCart } =
    useContext(CartContext);
  const alert = useAlert();

  const clearItemHandler = () => {
    clearItemFromCart(cartItem);
    alert.success("Item removed from cart");
  };

  const addItemHandler = () => {
    addItemtoCart(cartItem);
    alert.success("Quantity Increased");
  };
  const removeItemHandler = () => {
    removeItemToCart(cartItem);
    if (cartItem.quantity !== 1) alert.success("Quantity Decreased");
  };

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <span className="arrow" onClick={removeItemHandler}>
          &#10094;
        </span>
        <span className="value">{quantity}</span>
        <span className="arrow" onClick={addItemHandler}>
          &#10095;
        </span>
      </span>
      <span className="price">${price}</span>
      <div className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
