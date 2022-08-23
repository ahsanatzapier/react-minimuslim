import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as MiniMusimLogo } from "../../../assets/MiniMuslim.svg";

import CartIcon from "../../cart-icon/cart-icon.component";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../../contexts/user.context";
import { CartContext } from "../../../contexts/cart.context";

import { signOutUser } from "../../../utils/firebase/firebase.utils";
import { useAlert } from "react-alert";

import "./navigation.styles.scss";

const Navigation = () => {
  const alert = useAlert();
  const { currentUser } = useContext(UserContext);
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  const signOutHandler = () => {
    setIsCartOpen(false);
    signOutUser();
    alert.success("Successfully signed out ");
  };

  console.log(currentUser);
  return (
    <Fragment>
      <div className="navigation">
        <Link
          className="logo-container"
          to="/"
          onClick={() => setIsCartOpen(false)}
        >
          <MiniMusimLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link
            className="nav-link"
            to="/shop"
            onClick={() => setIsCartOpen(false)}
          >
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link
              className="nav-link"
              to="/auth"
              onClick={() => setIsCartOpen(false)}
            >
              SIGN IN
            </Link>
          )}

          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
