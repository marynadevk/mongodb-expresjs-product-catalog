import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import { Header } from "./components/Header/Header";
import { Modal } from "./components/Modal/Modal";
import { Backdrop } from "./components/Backdrop/Backdrop";
import { ProductsPage } from "./pages/Product/ProductsPage";
import { ProductDetailsPage } from "./pages/Product/ProductDetailsPage";
import { ProductEditPage } from "./pages/Product/ProductEditPage";
import { AuthPage } from "./pages/Auth/Auth";
import { ProductAddPage } from "./pages/Product/ProductAddPage";

export const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(true);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = () => {
    setIsAuth(false);
  };

  const authHandler = (
    event: React.FormEvent,
    authData: { email: string; password: string }
  ) => {
    event.preventDefault();
    if (authData.email.trim() === "" || authData.password.trim() === "") {
      return;
    }
    let request;
    if (authMode === "login") {
      request = axios.post(`${import.meta.env.VITE_API_URL}/login`, authData);
    } else {
      request = axios.post(`${import.meta.env.VITE_API_URL}/signup`, authData);
    }

    request
      .then((authResponse) => {
        if (authResponse.status === 201 || authResponse.status === 200) {
          const token = authResponse.data.token;
          console.log(token);
          setIsAuth(true);
        }
      })
      .catch((err) => {
        errorHandler(err.response.data.message);
        console.error(err);
        setIsAuth(false);
      });
  };

  const authModeChangedHandler = () => {
    setAuthMode((prevMode) => (prevMode === "login" ? "signup" : "login"));
  };

  const errorHandler = (message: string | null) => {
    setError(message);
  };

  const renderRoutes = () => {
    if (!isAuth) {
      return (
        <Routes>
          <Route path="*" element={<Navigate to="/auth" replace />} />
          <Route
            path="/auth"
            element={
              <AuthPage
                mode={authMode}
                onAuth={authHandler}
                onAuthModeChange={authModeChangedHandler}
              />
            }
          />
        </Routes>
      );
    }

    return (
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/auth" element={<Navigate to="/products" replace />} />
        <Route path="/signup" element={<Navigate to="/products" replace />} />
        <Route
          path="/product/:mode"
          element={<ProductEditPage onError={errorHandler} />}
        />
        <Route
          path="/products/:id/:mode"
          element={<ProductEditPage onError={errorHandler} />}
        />
        <Route
          path="//products/:mode"
          element={<ProductAddPage onError={errorHandler} />}
        />
        <Route
          path="/products/:id"
          element={<ProductDetailsPage onError={errorHandler} />}
        />
        <Route
          path="/products"
          element={<ProductsPage onError={errorHandler} />}
        />
      </Routes>
    );
  };

  return (
    <div className="App">
      <Modal isOpen={isOpen} title="An Error Occurred" setIsOpen={setIsOpen}>
        <p>{error}</p>
      </Modal>
      <Backdrop show={isOpen} />
      <Header authenticated={isAuth} onLogout={logoutHandler} />
      {renderRoutes()}
    </div>
  );
};
