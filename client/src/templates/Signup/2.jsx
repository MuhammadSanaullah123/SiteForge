import React, { useState } from "react";

//css
import "./2.scss";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    username: "",
    password: "",
    confirmPass: "",
  });

  const handleChange = (e) => {
    const Value = e.target.value;
    setValues({ ...values, [e.target.name]: Value });
  };

  return (
    <div id="signup">
      <div id="parentDiv">
        <p>Email</p>
        <div className="inputDiv">
          <span className="imgSpan">
            <i class="fa-solid fa-user img"></i>
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
        <p>Username</p>
        <div className="inputDiv">
          <span className="imgSpan">
            <i class="fa-solid fa-user img"></i>
          </span>
          <input
            className="input-field"
            type="text"
            placeholder="Username"
            name="username"
            value={values.username}
            required
            onChange={handleChange}
          />
        </div>

        <p>Password</p>
        <div className="inputDiv">
          <span className="imgSpan">
            <i class="fa-solid fa-key img"></i>
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
        <p>Confirm Password</p>
        <div className="inputDiv">
          <span className="imgSpan">
            <i class="fa-solid fa-key img"></i>
          </span>
          <input
            className="input-field"
            type="password"
            placeholder="Confirm Password"
            name="confirmPass"
            value={values.confirmPass}
            required
            onChange={handleChange}
          />
        </div>
        <button>Signup</button>
      </div>
    </div>
  );
};

export default Signup;
