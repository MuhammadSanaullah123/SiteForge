import React, { useState } from "react";
import { Link } from "react-router-dom";

//css
import "./1.scss";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [remember, setRemember] = useState(false);
  const handleRemember = (event) => {
    setRemember(event.target.checked);
  };
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
              <i className="fa-solid fa-user circleDiv2pic" alt="user icon"></i>
            </div>
          </div>
          <div className="smallDiv">
            <div className="input-container">
              <i className="inputimgback">
                <i className="fa-solid fa-envelope inputimg"></i>
              </i>
              <input
                className="input-field"
                type="text"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleInput}
                required
              />
            </div>
            <div className="input-container">
              <i className="inputimgback">
                <i className="fa-solid fa-key inputimg"></i>
              </i>
              <input
                className="input-field"
                type="text"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleInput}
                required
              />
            </div>

            <div className="check-container">
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
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
            </div>
          </div>
        </div>
        <div style={{ marginTop: "35px" }}>
          <Link className="l1">
            <button className="btn1">Login</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
