import React, { useContext, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";
import { MyContext } from "../utils/MyContextProvider";
import { NavLink, useNavigate } from "react-router-dom";

const Header = ({ filterIcon }) => {
  const { filterLayer, updateFilterLayer, items, logout } =
    useContext(MyContext);
  const navigate = useNavigate();

  const filterlayer = () => {
    updateFilterLayer(!filterLayer);
  };

  const logoutAccount = () => {
    logout();
    navigate("/login");
  };

  return (
    <header>
      <nav>
        <ul>
          <NavLink to="/home">
            <li>
              <div className="header-container">
                <FaCircleUser className="user-icon" />
                <h1>{localStorage.getItem("fullname")}</h1>
              </div>
            </li>
          </NavLink>
          <li>
            <div className="header-container">
              <NavLink to="/cart">
                <button className="cart-button" style={{ margin: "0px" }}>
                  {items?.length > 0 ? <p>{items.length}</p> : null}
                  <FaCartShopping className="user-icon" />
                </button>
              </NavLink>
              {filterIcon === "true" ? (
                <button
                  className="cart-button"
                  onClick={() => filterlayer()}
                  style={{ margin: "0px" }}
                >
                  <IoFilter className="user-icon" />
                </button>
              ) : null}
              <button
                className="logout"
                style={{ margin: "0px" }}
                onClick={() => logoutAccount()}
              >
                Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
