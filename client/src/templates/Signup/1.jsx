import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//css
import "./1.scss";

const SignUp = () => {
  const [remember, setRemember] = useState(false);
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    conpass: "",
  });

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
      <div className="mainsignupDiv">
        <div className="bigDivS">
          <div className="circleDiv">
            <div className="circleDiv2">
              <i className="fa-solid fa-user circleDiv2pic" alt="user icon"></i>
            </div>
          </div>
          <div className="smallDivS">
            <div className="input-container">
              <i className="inputimgback">
                <i className="fa-solid fa-address-card inputimg"></i>
              </i>
              <input
                className="input-field"
                type="text"
                placeholder="Username"
                name="name"
                value={values.name}
                onChange={handleInput}
                required
              />
            </div>
            <div className="input-container">
              <i className="inputimgback">
                <i className="fa-solid fa-envelope inputimg"></i>
              </i>
              <input
                className="input-field"
                type="email"
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
            <div className="input-container">
              <i className="inputimgback">
                <i className="fa-solid fa-key inputimg"></i>
              </i>
              <input
                className="input-field"
                type="text"
                placeholder="Confirm Password"
                name="conpass"
                value={values.conpass}
                onChange={handleInput}
                required
              />
            </div>
            <div className="check-container">
              <div style={{ display: "flex" }}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={remember}
                  onChange={handleRemember}
                />

                <span className="checkpS">
                  Agree to
                  <Link
                    to="/termconditions"
                    style={{
                      color: "#00B4FF",
                      textDecoration: "underline",
                      fontWeight: "700",
                      margin: "0px 0px 0px 5px",
                    }}
                  >
                    Terms and Condition!
                  </Link>{" "}
                </span>
              </div>
              <Link to="/login" className="checkp2">
                Login
              </Link>
            </div>
            <p
              style={{
                display: `${show && !remember ? "flex" : "none"}`,
              }}
              className="smallDivp"
            >
              Kindly check the checkbox!
            </p>
          </div>
        </div>
        <div style={{ marginTop: "35px" }}>
          <button className="btn1">Sign up</button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
