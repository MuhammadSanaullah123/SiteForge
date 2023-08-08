import React from "react";
import { Link } from "react-router-dom";
//assets
import logo from "../assets/logo-no-background.svg";

//api
import { createRepo, updateRepo } from "../actions/github";

const Navbar = () => {
  const input = {
    username: "MuhammadSanaullah123",
    repoName: "customized-react-app",
  };

  const updateInput = {
    username: "MuhammadSanaullah123",
    repoName: "customized-react-app",
    customizedCode: {
      "src/Login.jsx": [{ bcolor: "#2683ff" }],
    },
  };

  const handleSubmit = async () => {
    try {
      const response = await createRepo(input);

      console.log(response.data.html_url);
      alert(response.data.html_url);
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdate = async () => {
    try {
      const response = await updateRepo(updateInput);
      console.log(response.data);
      alert(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div id="navbar">
      <img
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        src={logo}
        alt="Website Logo"
      />
      {/* <button onClick={handleSubmit}>Finish</button>
      <button onClick={handleUpdate}>PUSH CODE</button> */}
      <div id="linkdiv">
        <Link>Templates</Link>
        <Link
          onClick={() =>
            document.getElementById("footer").scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          About
        </Link>
        <Link> Contact</Link>
      </div>

      <button>
        <i className="fa-brands fa-github githubimg"></i>
        <p>Login</p>
        <i className="fa-solid fa-angles-right btnimg"></i>
      </button>
    </div>
  );
};

export default Navbar;
