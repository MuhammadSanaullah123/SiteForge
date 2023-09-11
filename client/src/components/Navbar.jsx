import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContact } from "./ContactContext";
//assets
import logo from "../assets/logo-no-background.svg";

//api
import { getAccessToken, getUserData } from "../actions/github";

const scope = "public_repo";

const Navbar = () => {
  const navigate = useNavigate();
  const { toggleContact } = useContact();
  const [rerender, setRerender] = useState(false);
  const [isMobile, setIsMobile] = useState();

  const [toggle, setToggle] = useState(false);
  const [userData, setUserData] = useState({});
  const [showOptions, setShowOptions] = useState(false);

  const handleLogin = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${
        import.meta.env.VITE_GITHUB_CLIENT_ID
      }&scope=${scope}`
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
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("netlify_login");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("github_url");
    sessionStorage.removeItem("netlify_url");
  };
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParams = urlParams.get("code");

    if (codeParams && sessionStorage.getItem("login") === null) {
      async function handleAccessToken() {
        try {
          const response = await getAccessToken(codeParams);

          if (response.data === "Login Successfull") {
            sessionStorage.setItem("login", true);
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
    <div
      id="navbar"
      style={{
        marginBottom: `${
          (window.location.pathname.includes("templates/footer") && "100px") ||
          (window.location.pathname.includes("templates/header") && "100px")
        }`,
      }}
    >
      <img
        onClick={() => {
          window.location.assign("/home");
        }}
        src={logo}
        alt="Website Logo"
      />

      {!isMobile ? (
        <div id="linkdiv">
          <a href="/templates">Templates</a>
          <Link
            onClick={() =>
              document.getElementById("footermine").scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            About
          </Link>
          <Link onClick={toggleContact}> Contact</Link>
        </div>
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
              <Link onClick={handleLogin}> Login with GitHub</Link>
            </li>
            <li>
              <Link to="/templates">Templates</Link>
            </li>
            <li>
              <Link
                onClick={() =>
                  document.getElementById("footer").scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                About
              </Link>
            </li>
            <li>
              <Link onClick={toggleContact}> Contact</Link>
            </li>
          </nav>
        </div>
      )}

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
        <button
          style={{
            display: `${isMobile ? "none" : "flex"}`,
          }}
          onClick={handleLogin}
        >
          <i className="fa-brands fa-github githubimg"></i>
          <p>Login</p>
          <i className="fa-solid fa-angles-right btnimg"></i>
        </button>
      )}
    </div>
  );
};

export default Navbar;
