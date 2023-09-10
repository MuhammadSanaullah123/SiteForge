import React from "react";
import { Link } from "react-router-dom";
//assets
import logo from "../assets/logo-no-background.svg";
import netlify from "../assets/netlify.svg";

const FooterM = () => {
  const scrollToTop = () => {
    const smoothScrollToTop = () => {
      if (window.scrollY > 0) {
        const newPosition = window.scrollY - Math.min(window.scrollY, 40);
        window.scrollTo(0, newPosition);

        requestAnimationFrame(smoothScrollToTop);
      }
    };

    smoothScrollToTop();
  };
  return (
    <div
      style={{
        marginTop: `${
          (window.location.pathname.includes("templates/footer") && "100px") ||
          (window.location.pathname.includes("templates/header") && "100px")
        }`,
      }}
      id="footermine"
    >
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
        <div>
          <h1>Code Hosting Platform</h1>
          <button
            onClick={() => {
              scrollToTop();
            }}
            id="gitbtn"
          >
            <i className="fa-brands fa-github githubimg"></i>
            <p>GitHub</p>
          </button>
        </div>
        <div>
          <h1>Deployment Platform</h1>
          <button id="netbtn">
            <img className="homed2pic" src={netlify} alt="Logo of Netlify" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterM;
