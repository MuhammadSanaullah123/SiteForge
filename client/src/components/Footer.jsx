import React from "react";
import { Link } from "react-router-dom";
//assets
import logo from "../assets/logo-no-background.svg";
import netlify from "../assets/netlify.svg";

const Footer = () => {
  return (
    <div id="footer">
      <div id="footerd1">
        <img
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          src={logo}
          alt="Website Logo"
        />
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
        <Link>Help</Link>
        <Link>Templates</Link>
        <Link>Terms of Service</Link>
      </div>
      <div id="footerd3">
        <button id="gitbtn">
          <i className="fa-brands fa-github githubimg"></i>
          <p>GitHub</p>
        </button>

        <button id="netbtn">
          <img className="homed2pic" src={netlify} alt="Logo of Netlify" />
        </button>
      </div>
    </div>
  );
};

export default Footer;
