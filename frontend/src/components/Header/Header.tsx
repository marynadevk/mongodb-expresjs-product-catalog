import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

type Props = {
  authenticated: boolean;
  onLogout: () => void;
};

export const Header: React.FC<Props> = ({ authenticated, onLogout }) => {
  return (
    <header className="main-header">
      <nav className="main-header__nav">
        <ul className="main-header__nav-items">
          {authenticated && (
            <>
              <li className="main-header__nav-item">
                <Link to="/products">Products</Link>
              </li>
              <li className="main-header__nav-item">
                <Link to="/products/add">Add Product</Link>
              </li>
              <li className="main-header__nav-item">
                <button onClick={onLogout}>Logout</button>
              </li>
            </>
          )}
          {!authenticated && (
            <li className="main-header__nav-item">
              <Link to="/auth">Authenticate</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
