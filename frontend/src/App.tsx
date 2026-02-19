import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";
import { Profile } from "./pages/Profile";
import { About } from "./pages/About";
import Basket from "./pages/Basket";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { UsersAdmin } from "./pages/admin/UsersAdmin";
import { ProductsAdmin } from "./pages/admin/ProductsAdmin";
import { PartnersAdmin } from "./pages/admin/PartnersAdmin";
import { Error403Page } from "./pages/errors/Error403Page";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users-admin" element={<UsersAdmin />} />
        <Route path="/products-admin" element={<ProductsAdmin />} />
        <Route path="/partners-admin" element={<PartnersAdmin />} />
        <Route path="/admin" element={<Error403Page />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
