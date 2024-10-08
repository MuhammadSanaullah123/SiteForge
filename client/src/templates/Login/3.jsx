import React, { useState } from "react";
import { Link } from "react-router-dom";
//css
import "./3.scss";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState(false);

  const handleInput = (e) => {
    const Value = e.target.value;
    setValues({ ...values, [e.target.name]: Value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLogin(true);
  };
  return (
    <div id="login3">
      <div id="parentDiv">
        <i className="fa-brands fa-react"></i>
        <p>Login to your account</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>

          <input
            type="email"
            name="email"
            value={values.email}
            placeholder="Email"
            onChange={handleInput}
            required
          />
          <br />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={values.password}
            placeholder="Password"
            onChange={handleInput}
            required
          />
          <br />

          <button id="loginbtn" type="submit">
            Login
          </button>
          <button id="googlebtn">
            <i className="fa-brands fa-google"></i>Login with Google
          </button>
          <span>
            <Link to="/signup">Signup?</Link>
            <p> Forgot your password?</p>
            <a href="!#">Reset Password</a>{" "}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
