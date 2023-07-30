import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//assets
import guser from "../assets/guser.svg";
import passwordpic from "../assets/password.svg";

//api
import { getAccessToken, getUserData } from "../actions/github";
const CLIENT_ID = "527ea110abf67e712d0b";
const Login = () => {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({});

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [bcolor, setBColor] = useState("#ff5e00");
  const handleInput = (e) => {
    const Value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: Value,
    });
  };

  const handleLogin = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`
    );
  };

  const handleUserData = async () => {
    try {
      const response = await getUserData(localStorage.getItem("accessToken"));
      console.log(response);
      setUserData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParams = urlParams.get("code");
    console.log(codeParams);
    if (codeParams && localStorage.getItem("accessToken") === null) {
      async function handleAccessToken() {
        try {
          const response = await getAccessToken(codeParams);

          if (response.data.access_token) {
            localStorage.setItem("accessToken", response.data.access_token);
            setRerender(!rerender);
          }
        } catch (error) {
          console.error(error);
        }
      }
      handleAccessToken();
    }
  }, []);

  return (
    <>
      <div className="mainloginDiv">
        <div className="bigDiv">
          <div className="circleDiv">
            <div className="circleDiv2">
              <img className="circleDiv2pic" src={guser} alt="" />
            </div>
          </div>
          <div className="smallDiv">
            {localStorage.getItem("accessToken") ? (
              <>
                <h1>We have the access token</h1>
                <button
                  onClick={() => {
                    localStorage.removeItem("accessToken");
                    setRerender(!rerender);
                  }}
                >
                  Log out
                </button>
                <h1>Get user data from API</h1>
                <button onClick={handleUserData}>Get Data</button>
                {userData.login ? (
                  <>
                    <h3 style={{ color: "red" }}>Hi {userData.login}</h3>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <button onClick={handleLogin} variant="contained">
                Login with GitHub
              </button>
            )}
            <div className="input-container">
              {/*   <i className="inputimgback">
                <EmailIcon className="inputimg" />
              </i> */}
              <input
                className="input-field"
                type="text"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleInput}
              />
            </div>
            <div className="input-container">
              <i className="inputimgback">
                <img className="inputimg" src={passwordpic} alt="" />
              </i>
              <input
                className="input-field"
                type="text"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleInput}
              />
            </div>
            {/*     <div className="check-container">
              <div style={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  className="form-check-input"
                  checked={remember}
                  onChange={handleRemember}
                />

                <p className="checkp">Remember me!</p>
                <div></div>
              </div>
              <Link to="/signup" className="checkp2">
                Create Account
              </Link>
            </div> */}
          </div>
        </div>
        <div style={{ marginTop: "35px" }}>
          <Link className="l1">
            <button style={{ backgroundColor: bcolor }} className="btn1">
              Login1
            </button>
          </Link>
          <button className="option" onClick={() => setBColor("#2683ff")}>
            color: {bcolor}
          </button>
          <button className="option" onClick={() => setBColor("#2683ff")}>
            color: {bcolor}
          </button>
        </div>

        {/* <div className="mainimgDiv">
          <div style={{ background: "#C54238" }} className="imgDiv">
            <img className="endimg" src={google} alt="" />
          </div>
          <div style={{ background: "#2F4D93" }} className="imgDiv">
            <img className="endimg" src={fb} alt="" />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Login;
