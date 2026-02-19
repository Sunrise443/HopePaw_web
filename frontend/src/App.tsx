// App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
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
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/error-403" element={<Error403Page />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/users-admin"
            element={
              <ProtectedRoute requiredRoles={["admin", "manager"]}>
                <UsersAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products-admin"
            element={
              <ProtectedRoute requiredRoles={["admin", "manager"]}>
                <ProductsAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/partners-admin"
            element={
              <ProtectedRoute requiredRoles={["admin"]}>
                <PartnersAdmin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
