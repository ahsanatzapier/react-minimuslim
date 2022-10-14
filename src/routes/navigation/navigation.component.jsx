import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactComponent as MiniMusimLogo } from "../../assets/MiniMuslim.svg";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { signOutUser } from "../../utils/firebase/firebase.utils";
// import { useNavigate } from "react-router-dom";

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";

const Navigation = () => {
  // const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  // const signOutHandler = () => {
  //   setIsCartOpen(false);
  //   signOutUser();
  //   navigate("/");
  // };

  // console.log(currentUser);
  return (
    <Fragment>
      <NavigationContainer>
        {/* <LogoContainer to="/" onClick={() => setIsCartOpen(false)}> */}
        <LogoContainer to="/">
          <MiniMusimLogo className="logo" />
        </LogoContainer>

        <NavLinks>
          {/* <NavLink to="/shop" onClick={() => setIsCartOpen(false)}> */}
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            // <NavLink as="span" onClick={signOutHandler}>
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            // <NavLink to="/auth" onClick={() => setIsCartOpen(false)}>
            <NavLink to="/auth">SIGN IN</NavLink>
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
