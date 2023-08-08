import React from "react";
import { Link } from "react-router-dom";

//assets
import screen from "../assets/screen.png";
import netlify from "../assets/netlify.svg";

const Home = () => {
  return (
    <div id="home">
      <div id="homed1">
        <div>
          <h1 id="homed1h1">Let's</h1>
          <h1 id="homed1h2">Start</h1>
          <h1 id="homed1h3">Building</h1>
          <i
            className="fa-solid fa-circle-down"
            onClick={() =>
              document.getElementById("homed2").scrollIntoView({
                behavior: "smooth",
              })
            }
          ></i>
          <span id="homed1span">
            <p id="homed1spanp1">No Coding!</p>
            <p id="homed1spanp2">
              Create a fully functional web project with customizable components
              and pages.
              <br /> Deploy on Netlify automatically for end user product.
            </p>
          </span>
        </div>
        <img id="screenimg" src={screen} alt="" />
      </div>
      <div id="homed2">
        <h1 className="homed2h1">How to get started</h1>
        <div className="homed2section">
          <i className="fa-brands fa-github homed2pic"></i>
          <div className="homed2sectiond1">
            <h1 className="homed2sectionh1">Connect your GitHub</h1>
            <p className="homed2sectionp1">
              Connect your Github account to allow us to create a new repository
              with complete react application.
            </p>
          </div>
        </div>
        <div className="homed2section">
          <i className="fa-solid fa-screwdriver-wrench homed2pic"></i>
          <div className="homed2sectiond1">
            <h1 className="homed2sectionh1">Customize your Application</h1>
            <p className="homed2sectionp1">
              Choose from given templates and customize or even remove
              components.
            </p>
          </div>
        </div>
        <div className="homed2section">
          <img className="homed2pic" src={netlify} alt="Logo of Netlify" />
          <div className="homed2sectiond1">
            <h1 className="homed2sectionh1">Deploy on Netlify</h1>
            <p className="homed2sectionp1">
              Connect your Netlify account to our website to automatically
              deploy the react application <br />
              which we created in your Github.
            </p>
          </div>
        </div>
        <Link to="/signup" className="homed2btn">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;
