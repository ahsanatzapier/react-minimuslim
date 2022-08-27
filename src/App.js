import { Routes, Route } from "react-router-dom";

import Navigation from "../src/routes/navigation/navigation.component";
import Home from "../src/routes/home/home.component";
import Authentication from "../src/routes/authentication/authentication.component";
import Shop from "../src/routes/shop/shop.component";
import Checkout from "../src/routes/checkout/checkout.component";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
