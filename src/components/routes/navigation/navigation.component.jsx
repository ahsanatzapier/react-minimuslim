import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as MiniMusimLogo } from "../../../assets/MiniMuslim.svg";

import CartIcon from "../../cart-icon/cart-icon.component";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../../contexts/user.context";
import { CartContext } from "../../../contexts/cart.context";

import { signOutUser } from "../../../utils/firebase/firebase.utils";
// import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";

const Navigation = () => {
  const navigate = useNavigate();
  // const alert = useAlert();
  const { currentUser } = useContext(UserContext);
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  const signOutHandler = () => {
    setIsCartOpen(false);
    signOutUser();
    // alert.success("Successfully signed out ");
    navigate("/");
  };

  console.log(currentUser);
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/" onClick={() => setIsCartOpen(false)}>
          <MiniMusimLogo className="logo" />
        </LogoContainer>

        <NavLinks>
          <NavLink to="/shop" onClick={() => setIsCartOpen(false)}>
            SHOP
          </NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutHandler}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth" onClick={() => setIsCartOpen(false)}>
              SIGN IN
            </NavLink>
          )}

          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
