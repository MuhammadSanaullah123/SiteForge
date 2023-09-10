import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//css
import "./1.scss";

const Header = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isMobile, setIsMobile] = useState();
  const [toggle, setToggle] = useState(false);
  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleLogout = () => {
    setIsLogin(false);
  };
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 650) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="header">
      <i className="fa-brands fa-react"></i>

      {!isMobile ? (
        <nav id="linkdiv">
          <li>
            <Link>Templates</Link>
          </li>
          <li>
            <Link>About</Link>
          </li>
          <li>
            <Link> Contact</Link>
          </li>
        </nav>
      ) : (
        <div
          style={{
            marginLeft: "auto",
            marginRight: "20px",
          }}
        >
          <i
            onClick={() => setToggle(!toggle)}
            className="fa-solid fa-bars"
          ></i>
          <nav
            style={{
              display: `${toggle ? "flex" : "none"}`,
            }}
            id="mobilelinkdiv"
          >
            <li>
              <Link>Templates</Link>
            </li>
            <li>
              <Link>About</Link>
            </li>
            <li>
              <Link> Contact</Link>
            </li>
          </nav>
        </div>
      )}
      {isLogin ? (
        <div className="dpdiv" onClick={() => setShowOptions(!showOptions)}>
          <span className="dpSpan">
            <i class="fa-solid fa-user"></i>
          </span>
          <div
            style={{
              display: `${showOptions ? "flex" : "none"}`,
            }}
            className="logoutdiv"
          >
            <a onClick={handleLogout}>Logout</a>
          </div>
        </div>
      ) : (
        <button onClick={handleLogin}>
          <i className="fa-brands fa-react githubimg"></i>
          <p>Login</p>
          <i className="fa-solid fa-angles-right btnimg"></i>
        </button>
      )}
    </header>
  );
};

export default Header;
