import React, { useState } from "react";

//css
import "./2.scss";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  const handleChange = (e) => {
    const Value = e.target.value;
    setValues({ ...values, [e.target.name]: Value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLogin(true);
  };
  console.log(isLogin);
  return (
    <div id="login2">
      <div id="parentDiv">
        <form onSubmit={handleSubmit}>
          <p>Email</p>
          <div className="inputDiv">
            <span className="imgSpan">
              <i className="fa-solid fa-user img"></i>
            </span>
            <input
              className="input-field"
              type="email"
              placeholder="Email"
              name="email"
              value={values.email}
              required
              onChange={handleChange}
            />
          </div>
          <p>Password</p>
          <div className="inputDiv">
            <span className="imgSpan">
              <i className="fa-solid fa-key img"></i>
            </span>
            <input
              className="input-field"
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              required
              onChange={handleChange}
            />
          </div>
          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
