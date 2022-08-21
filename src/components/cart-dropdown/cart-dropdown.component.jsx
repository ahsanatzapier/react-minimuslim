import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <dir className="cart-items"></dir>
      <Button buttonType="normal">Go to Checkout</Button>
    </div>
  );
};

export default CartDropdown;
