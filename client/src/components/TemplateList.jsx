import React from "react";
import { useNavigate } from "react-router-dom";

const TemplateList = () => {
  const navigate = useNavigate();
  const handleSelect = (event) => {
    const src = event.target.getAttribute("src");
    const type = event.target.getAttribute("name");

    /*    localStorage.setItem("login", JSON.stringify({ id: "1", src: src })); */
    navigate(`/templates/login?type=${type}&id=1&src=${src}`);
    window.location.reload();
  };
  return (
    <div id="templateList">
      <div id="templatelistd1">
        <img
          src="https://res.cloudinary.com/dmtcur7kt/image/upload/v1691864458/login123.png"
          name="Login"
          alt=""
          onClick={handleSelect}
        />
      </div>
      <div id="templatelistd1"></div>
      <div id="templatelistd1"></div>
    </div>
  );
};

export default TemplateList;
