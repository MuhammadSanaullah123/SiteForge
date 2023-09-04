import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//assets
import logo from "../assets/logo-no-background.svg";

//components
import Spinner from "./Spinner";

//api
import { updateRepo, getAccessToken, getUserData } from "../actions/github";

const CLIENT_ID = "527ea110abf67e712d0b";
const scope = "public_repo"; // or "repo" for private repositories

const Navbar = () => {
  const navigate = useNavigate();
  const [rerender, setRerender] = useState(false);

  const [userData, setUserData] = useState({});
  const [showOptions, setShowOptions] = useState(false);

  const handleLogin = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${scope}`
    );
  };
  const handleUserData = async () => {
    try {
      const response = await getUserData(sessionStorage.getItem("accessToken"));

      setUserData(response.data);
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          username: response.data.login,
          avatar: response.data.avatar_url,
          url: response.data.html_url,
        })
      );
    } catch (err) {
      console.error(err);
    }
  };
  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
  };
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParams = urlParams.get("code");

    if (codeParams && sessionStorage.getItem("accessToken") === null) {
      async function handleAccessToken() {
        try {
          const response = await getAccessToken(codeParams);

          if (response.data.access_token) {
            sessionStorage.setItem("accessToken", response.data.access_token);
            setRerender(!rerender);
          }
          handleUserData();
        } catch (error) {
          console.error(error);
        }
      }
      handleAccessToken();
    }
  }, []);

  return (
    <div id="navbar">
      <img
        onClick={() => {
          navigate("/home");
        }}
        src={logo}
        alt="Website Logo"
      />
      {/* <button onClick={handleSubmit}>Finish</button>
      <button onClick={handleUpdate}>PUSH CODE</button> */}
      <div id="linkdiv">
        <Link to="/templates">Templates</Link>
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
      {sessionStorage.getItem("user") ? (
        <div className="dpdiv" onClick={() => setShowOptions(!showOptions)}>
          <img
            src={JSON.parse(sessionStorage.getItem("user")).avatar}
            alt="user avatar"
          />
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
          <i className="fa-brands fa-github githubimg"></i>
          <p>Login</p>
          <i className="fa-solid fa-angles-right btnimg"></i>
        </button>
      )}
    </div>
  );
};

export default Navbar;
