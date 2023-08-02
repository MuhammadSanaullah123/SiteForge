import React from "react";

//api
import { createRepo, updateRepo } from "../actions/github";

const Navbar = () => {
  const input = {
    username: "MuhammadSanaullah123",
    repoName: "customized-react-app",
  };

  const updateInput = {
    username: "MuhammadSanaullah123",
    repoName: "customized-react-app",
    customizedCode: {
      "src/Login.jsx": [{ bcolor: "#2683ff" }],
    },
  };

  const handleSubmit = async () => {
    try {
      const response = await createRepo(input);

      console.log(response.data.html_url);
      alert(response.data.html_url);
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdate = async () => {
    try {
      const response = await updateRepo(updateInput);
      console.log(response.data);
      alert(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div id="navbar">
      <h1 style={{ color: "red" }}>NAVBAR</h1>
      <button onClick={handleSubmit}>Finish</button>
      <button onClick={handleUpdate}>PUSH CODE</button>
    </div>
  );
};

export default Navbar;
