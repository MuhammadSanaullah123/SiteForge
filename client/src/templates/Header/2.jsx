import React, { useState } from "react";

//css
import "./2.scss";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleLogout = () => {
    setIsLogin(false);
  };
  return (
    <header id="header2">
      <i className="fa-brands fa-react"></i>
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
