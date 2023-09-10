import React, { useState } from "react";

//css
import "./3.scss";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
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
    <div id="login">
      <div id="parentDiv">
        <i class="fa-brands fa-react"></i>
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

          <label htmlFor="username">Username</label>
          <input
            type="username"
            name="username"
            value={values.username}
            placeholder="Username"
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
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            placeholder="Confirm Password"
            onChange={handleInput}
            required
          />
          <br />
          <button id="loginbtn" type="submit">
            Create Account
          </button>
          <button id="googlebtn">
            <i className="fa-brands fa-google"></i>Login with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
