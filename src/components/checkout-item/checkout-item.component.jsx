import { useSelector, useDispatch } from "react-redux";
// import { useAlert } from "react-alert";
import {
  clearItemFromCart,
  addItemToCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";

import { selectCartItems } from "../../store/cart/cart.selector";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  // const alert = useAlert();

  const clearItemHandler = () => {
    dispatch(clearItemFromCart(cartItems, cartItem));
    // alert.success("Item removed from cart");
  };

  const addItemHandler = () => {
    dispatch(addItemToCart(cartItems, cartItem));
    // alert.success("Quantity Increased");
  };
  const removeItemHandler = () => {
    dispatch(removeItemFromCart(cartItems, cartItem));
    // if (cartItem.quantity !== 1) alert.success("Quantity Decreased");
  };

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
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
