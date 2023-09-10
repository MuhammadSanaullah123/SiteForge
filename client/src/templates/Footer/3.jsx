import React, { useState } from "react";

//css
import "./3.scss";

const Footer = () => {
  const [values, setValues] = useState({
    email: "",
  });

  const handleInput = (e) => {
    const Value = e.target.value;
    setValues({ ...values, [e.target.name]: Value });
  };
  return (
    <div id="footer">
      <nav className="footerd1 footera">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#terms">Terms of Service</a>
      </nav>
      <nav className="footerd2 footera">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#terms">Terms of Service</a>
      </nav>
      <nav className="footerd3 footera">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#terms">Terms of Service</a>
      </nav>
      <div className="footerd4">
        <i
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          className="fa-brands fa-react"
        ></i>
      </div>
      <div id="imgDiv">
        <i className="fa-brands fa-instagram ficon"></i>
        <i className="fa-brands fa-x-twitter ficon"></i>
        <i className="fa-brands fa-square-facebook ficon"></i>
        <i className="fa-brands fa-square-pinterest ficon"></i>
      </div>
    </div>
  );
};

export default Footer;
