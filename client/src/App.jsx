import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { ProductListContainer } from "./components/ProductListContainer/ProductListContainer";
import { Cart } from "./components/Cart/Cart";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProductListContainer />} />
        <Route path="/productos" element={<ProductListContainer />} />
        {user.length === 0 ? 
          <>
            <Route path="/registrate" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
          </>
          :
          <>
            <Route path="/cart" element={<Cart />} />
          </>
        }
      </Routes>
    </div>
  );
};

export default App;
