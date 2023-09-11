import React, { useState } from "react";

//css
import "./2.scss";

const Footer = () => {
  const [values, setValues] = useState({
    email: "",
  });

  const handleInput = (e) => {
    const Value = e.target.value;
    setValues({ ...values, [e.target.name]: Value });
  };
  return (
    <div id="footer2">
      <div id="footerd1">
        <i
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          className="fa-brands fa-react"
        ></i>
        <h1>Forge your own website</h1>
        <p>
          SiteForge is a platform which can create your customized multi page
          website. You can choose from pre built templates and customize them as
          you go.
          <br />
          <br />
          Made with <i className="fa-solid fa-heart"></i> and{" "}
          <i className="fa-solid fa-screwdriver"></i> by a one man army.
        </p>
      </div>
      <div id="footerd2">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#terms">Terms of Service</a>
      </div>
      <div id="footerd3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleInput}
          required
        />
        <button id="gitbtn">Subscribe</button>
      </div>
    </div>
  );
};

export default Footer;
