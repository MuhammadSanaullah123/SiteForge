import React, { useState } from "react";
import { Link } from "react-router-dom";
//assets
import guser from "../assets/guser.svg";
import passwordpic from "../assets/password.svg";

const Login = () => {
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
              Login
            </button>
          </Link>
          <button onClick={() => setBColor("#2683ff")}>color: {bcolor}</button>
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
