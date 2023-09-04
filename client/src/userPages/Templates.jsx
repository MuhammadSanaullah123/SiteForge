import React, { useState } from "react";

//components
import TemplateList from "../components/TemplateList";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";

//api
import { createRepo, updateRepo } from "../actions/github";

const Templates = () => {
  const [value, setValue] = useState({
    repo: "",
    name: "",
  });
  const [loadingProcess] = useState([
    "Creating Repository...",
    "Pushing Code...",
  ]);
  const [loadingProcessIndex, setLoadingProcessIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showLoadingModal, setLoadingModal] = useState(false);

  const [createdAlert, setCreatedAlert] = useState(false);
  const [updatedAlert, setUpdatedAlert] = useState(false);

  /*   const [loading, setLoading] = useState(true); */

  const handleUpdate = async () => {
    const updateInput = {
      username: JSON.parse(sessionStorage.getItem("user")).username,
      repoName: value.name,
      userPages: JSON.parse(localStorage.getItem("userPages")),
      customizedCode: {
        "src/userPages/Login.jsx": [{ bcolor: "#2683ff" }],
      },
    };

    try {
      const response = await updateRepo(updateInput);
      console.log(response.data);
      setUpdatedAlert(true);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(JSON.parse(localStorage.getItem("userPages")));

  const handleChange = (e) => {
    const Value = e.target.value;
    setValue({ ...value, [e.target.name]: Value });
  };

  const handleSubmit = async () => {
    event.preventDefault();
    setShowModal(false);
    setLoadingModal(true);
    if (value.repo === "New") {
      try {
        const name = value.name;
        const response = await createRepo(name);

        setCreatedAlert(true);
      } catch (error) {
        console.error(error);
      }
    }
    setLoadingProcessIndex((prev) => prev + 1);

    handleUpdate();
  };

  return (
    <div id="templates">
      {createdAlert && (
        <Alert
          message="Repository Created"
          type="success"
          time={3000}
          setShowAlert={setCreatedAlert}
        />
      )}
      <h1>Your web application</h1>

      {localStorage.getItem("userPages") ? (
        JSON.parse(localStorage.getItem("userPages")).map((template) => (
          <div id="templateList" key={template.id}>
            <div id="templatelistd1">
              <img src={template.src} alt="" />
            </div>
            <div id="templatelistd1"></div>
            <div id="templatelistd1"></div>
          </div>
        ))
      ) : (
        <div id="templatesd1">
          <p>Nothing to see here...</p>
          <i className="fa-solid fa-ghost"></i>
        </div>
      )}

      <h1>Log in</h1>
      <TemplateList />
      <h1>Signup</h1>
      <TemplateList />
      <button onClick={() => setShowModal(true)} className="finishbtn">
        Finish
      </button>
      <div
        id="modal"
        style={{
          display: `${showModal ? "flex" : "none"}`,
        }}
      >
        <span className="startimg">
          <i className="fa-brands fa-github"></i>
          <i
            className="fa-solid fa-xmark"
            onClick={() => setShowModal(false)}
          ></i>
        </span>

        <form onSubmit={handleSubmit}>
          <span>
            <input
              type="radio"
              id="new"
              name="repo"
              value="New"
              onChange={handleChange}
            />
             
            <label className="radiolabel" htmlFor="new">
              Create new repository
            </label>
          </span>
          <input
            value={value.repo == "New" ? value.name : ""}
            onChange={handleChange}
            name="name"
            type="text"
            placeholder="Name"
            disabled={value.repo == "Current"}
          />

          <span style={{ marginTop: "10px" }}>
            <input
              type="radio"
              id="current"
              name="repo"
              value="Current"
              onChange={handleChange}
            />
             
            <label className="radiolabel" htmlFor="current">
              Use already existing repository
            </label>
          </span>
          <input
            value={value.repo == "Current" ? value.name : ""}
            onChange={handleChange}
            name="name"
            type="text"
            placeholder="Name"
            disabled={value.repo == "New"}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div
        id="loadingModal"
        style={{
          display: `${showLoadingModal ? "flex" : "none"}`,
        }}
      >
        <h1 className="loadingModalh1">
          {loadingProcess[loadingProcessIndex]}
        </h1>
        <Spinner position="static" />
      </div>
      {updatedAlert && (
        <Alert
          message="Code Pushed"
          type="success"
          time={3000}
          setShowAlert={setUpdatedAlert}
        />
      )}
    </div>
  );
};

export default Templates;
