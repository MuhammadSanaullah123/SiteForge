import React from "react";
import { Link } from "react-router-dom";

//css
import "./1.scss";

const Footer = () => {
  return (
    <div id="footer1">
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
        <Link>Home</Link>
        <Link>About</Link>
        <Link>Terms of Service</Link>
      </div>
      <div id="footerd3">
        <div>
          <button id="gitbtn">
            <i className="fa-brands fa-react"></i>
            <p>Login</p>
          </button>
        </div>
        <div>
          <button id="netbtn">
            <i className="fa-brands fa-react"></i>
            <p>Signup</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
