import React, { useState } from "react";

//css
import "./3.scss";

const Header = () => {
  const [values, setValues] = useState({
    search: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleChange = (e) => {
    const Value = e.target.value;
    setValues({ ...values, [e.target.name]: Value });
  };

  const handleLogout = () => {
    setIsLogin(false);
  };
  return (
    <header id="header3">
      <i className="fa-brands fa-react"></i>
      <form className="inputDiv">
        <span className="imgSpan">
          <i className="fa-solid fa-magnifying-glass img"></i>
        </span>
        <input
          className="input-field"
          type="search"
          placeholder="Search"
          name="search"
          value={values.search}
          required
          onChange={handleChange}
        />
      </form>
      <span id="iconDiv">
        <i className="fa-solid fa-cart-shopping ficon"></i>
        <i className="fa-solid fa-envelope ficon"></i>
        <i className="fa-solid fa-user ficon"></i>
      </span>
      <i
        onClick={() => setIsMobile(!isMobile)}
        className="fa-solid fa-bars"
      ></i>
      <span
        style={{
          display: `${isMobile ? "flex" : "none"}`,
        }}
        id="iconmobileDiv"
      >
        <i className="fa-solid fa-cart-shopping ficon"></i>
        <i className="fa-solid fa-envelope ficon"></i>
        <i className="fa-solid fa-user ficon"></i>
        <button
          onClick={isLogin ? handleLogout : handleLogin}
          variant="contained"
        >
          {isLogin ? "Log out" : "Login"}
        </button>
      </span>
      <button
        onClick={isLogin ? handleLogout : handleLogin}
        variant="contained"
      >
        {isLogin ? "Log out" : "Login"}
      </button>
    </header>
  );
};

export default Header;
