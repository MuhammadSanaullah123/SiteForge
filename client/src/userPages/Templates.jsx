import React, { useState, useEffect, lazy, Suspense } from "react";

//components
import TemplateList from "../components/TemplateList";
import TemplateListScroll from "../components/TemplateListScroll";

import Alert from "../components/Alert";
import Spinner from "../components/Spinner";

//assets
import netlify from "../assets/netlify.svg";

//constants
import {
  logintemplatePages,
  signuptemplatePages,
  headertemplatePages,
  footertemplatePages,
} from "../constants";

//api
import { createRepo, updateRepo } from "../actions/github";
import { saveAccessToken, createSite } from "../actions/netlify";

const Templates = () => {
  let state = null;
  const [value, setValue] = useState({
    repo: "",
    name: "",
    site_name: "",
  });

  const [loadingProcess] = useState([
    "Creating Repository...",
    "Pushing Code...",
    "Connect your Netlify to deploy web application",
    "",
    "Deploying...",
    "Deployed",
  ]);
  const [loadingProcessIndex, setLoadingProcessIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showLoadingModal, setLoadingModal] = useState(false);
  const [warning, setWarning] = useState(false);
  const [createdAlert, setCreatedAlert] = useState(false);
  const [updatedAlert, setUpdatedAlert] = useState(false);

  const handleUpdate = async () => {
    let customCode = JSON.parse(sessionStorage.getItem("customCode"));
    const updateInput = {
      username: JSON.parse(sessionStorage.getItem("user")).username,
      repoName: value.name,
      userPages: JSON.parse(localStorage.getItem("userPages")),
      customCode: customCode
        ? customCode
        : {
            primaryColor: getComputedStyle(
              document.documentElement
            ).getPropertyValue("--primary-color"),
          },
    };

    try {
      const response = await updateRepo(updateInput);
      /* setNewProject({ ...newProject, github_url: response.data }); */
      sessionStorage.setItem("github_url", response.data);
      setUpdatedAlert(true);
      setLoadingProcessIndex((prev) => prev + 1);
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
        sessionStorage.setItem("repo_ID", response.data.id);
        setCreatedAlert(true);
      } catch (error) {
        console.error(error);
      }
    }
    setLoadingProcessIndex((prev) => prev + 1);

    handleUpdate();
  };

  const netlifyLogin = () => {
    window.location.assign(
      `https://app.netlify.com/authorize?response_type=token&client_id=${
        import.meta.env.VITE_NETLIFY_CLIENT_ID
      }&state=${state}&redirect_uri=${encodeURIComponent(window.location.href)}`
    );
  };

  const netlifyDeploy = async () => {
    setLoadingProcessIndex((prev) => prev + 1);
    try {
      const response = await createSite(
        JSON.parse(sessionStorage.getItem("user")).username,
        sessionStorage.getItem("github_url").split("/")[4],
        sessionStorage.getItem("repo_ID"),
        value.site_name
      );
      if (response.data === "Site name is already taken!") {
        setWarning(true);
        setLoadingProcessIndex((prev) => prev - 1);
      } else {
        setLoadingProcessIndex((prev) => prev + 1);
      }
      console.log(response.data);

      sessionStorage.setItem("netlify_url", response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNetlifyLogin = async (response) => {
    await saveAccessToken(response.access_token);
  };
  useEffect(() => {
    if (
      document.location.hash &&
      sessionStorage.getItem("netlify_login") === null
    ) {
      const response = window.location.hash
        .replace(/^#/, "")
        .split("&")
        .reduce((result, pair) => {
          const keyValue = pair.split("=");
          result[keyValue[0]] = keyValue[1];
          return result;
        }, {});
      document.location.hash = "";
      handleNetlifyLogin(response);
      sessionStorage.setItem("netlify_login", true);
      console.log(setLoadingModal);

      setLoadingModal(true);
      setLoadingProcessIndex(3);
    }
  }, []);

  useEffect(() => {
    if (loadingProcessIndex === 5) {
      localStorage.removeItem("userPages");
      sessionStorage.removeItem("repo_ID");
    }
  }, [loadingProcessIndex]);

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

      <div id="templateList">
        {localStorage.getItem("userPages") ? (
          JSON.parse(localStorage.getItem("userPages"))
            .filter((page) => {
              return page.type === "Login" || (page.type === "Signup" && page);
            })
            .map((template, index) => (
              <div id="templatelistd1" key={index}>
                <img src={template.src} alt="" />
              </div>
            ))
        ) : (
          <div id="templatesd1">
            <p>Nothing to see here...</p>
            <i className="fa-solid fa-ghost"></i>
          </div>
        )}
      </div>
      {JSON.parse(localStorage.getItem("userPages")) &&
        JSON.parse(localStorage.getItem("userPages")).some(
          (obj) => obj.type === "Header" || obj.type === "Footer"
        ) && (
          <div id="templateListLong">
            {JSON.parse(localStorage.getItem("userPages"))
              .filter((page) => {
                return (
                  page.type === "Header" || (page.type === "Footer" && page)
                );
              })
              .map((template, index) => (
                <div id="templatelistd1" key={index}>
                  <img src={template.src} alt="" />
                </div>
              ))}
          </div>
        )}

      <h1>Log in</h1>
      <TemplateList pages={logintemplatePages} />
      <h1>Signup</h1>
      <TemplateList pages={signuptemplatePages} />
      <h1>Header</h1>
      <TemplateListScroll pages={headertemplatePages} />
      <h1>Footer</h1>
      <TemplateListScroll pages={footertemplatePages} />
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
            required
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
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div
        id="loadingModal"
        style={{
          display: `${showLoadingModal ? "flex" : "none"}`,
          width: `${
            loadingProcessIndex === 5 || loadingProcessIndex === 2
              ? "450px"
              : "400px"
          }`,
          height: `${
            loadingProcessIndex === 5 || loadingProcessIndex === 2
              ? "300px"
              : "200px"
          }`,
        }}
      >
        <span className="startimg">
          <img
            style={{
              visibility: `${
                loadingProcessIndex === 2
                  ? "visible"
                  : "hidden" &&
                    (loadingProcessIndex === 3 ? "visible" : "hidden")
              }`,
            }}
            id="netlifyimg"
            src={netlify}
            alt=""
          />
          <i
            className="fa-solid fa-xmark"
            onClick={() => setLoadingModal(false)}
          ></i>
        </span>
        {loadingProcessIndex === 2 && (
          <p>
            Github URL:{" "}
            <a href={sessionStorage.getItem("github_url")} target="_blank">
              {sessionStorage.getItem("github_url")}
            </a>
          </p>
        )}

        <h1 className="loadingModalh1">
          {loadingProcess[loadingProcessIndex]}
        </h1>
        {loadingProcessIndex === 5 && (
          <>
            <p>
              Github URL:{" "}
              <a href={sessionStorage.getItem("github_url")} target="_blank">
                {sessionStorage.getItem("github_url")}
              </a>
            </p>
            <p>
              Netlify URL:{" "}
              <a
                href={`https://${sessionStorage.getItem("netlify_url")}`}
                target="_blank"
              >
                {sessionStorage.getItem("netlify_url")}
              </a>
            </p>
          </>
        )}
        {loadingProcessIndex === 2 ? (
          <button onClick={netlifyLogin} id="netbtn">
            <img className="homed2pic" src={netlify} alt="Logo of Netlify" />
          </button>
        ) : (
          <>
            {loadingProcessIndex === 5 ? (
              <i className="fa-regular fa-circle-check"></i>
            ) : (
              <>
                {loadingProcessIndex === 3 ? (
                  <>
                    <div id="netlifydiv">
                      <form onSubmit={netlifyDeploy}>
                        {warning && (
                          <p id="warningp">Site name is already taken!</p>
                        )}
                        <input
                          value={value.site_name}
                          onChange={handleChange}
                          name="site_name"
                          type="text"
                          placeholder="Site Name e.g. custom_name.netlify.app"
                          required
                        />
                        <button type="submit">Submit</button>
                      </form>
                    </div>
                  </>
                ) : (
                  <Spinner position="static" />
                )}
              </>
            )}
          </>
        )}
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
