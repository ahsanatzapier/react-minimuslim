import { Routes, Route } from "react-router-dom";

import Navigation from "./components/routes/navigation/navigation.component";
import Home from "./components/routes/home/home.component";
import SignIn from '../src/components/routes/sign-in/sign-in.component'

const Shop = () =>{
  return (<h1>hello</h1>)
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home /> }/>
        <Route path='shop' element={<Shop />} />
        <Route path='sign-In' element={<SignIn />}/>
        </Route>
    </Routes>
  )
}

export default App;
