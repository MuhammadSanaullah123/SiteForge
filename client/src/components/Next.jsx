import React from "react";
import { useNavigate } from "react-router-dom";

const Next = () => {
  const navigate = useNavigate();
  const handleSave = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    const src = urlParams.get("src");
    const type = urlParams.get("type");
    console.log("next");
    console.log(id);
    console.log(src);
    console.log(type);

    const current_data = { type: type, id: id, src: src };
    if (localStorage.getItem("userPages")) {
      const arr = JSON.parse(localStorage.getItem("userPages"));
      let index = arr.findIndex((obj) => obj.type === current_data.type);
      if (index !== -1) {
        arr[index] = current_data;
      } else {
        arr.push(current_data);
      }
      localStorage.setItem("userPages", JSON.stringify(arr));
    } else {
      localStorage.setItem("userPages", JSON.stringify([current_data]));
    }
    window.location.assign(`/templates`);
  };
  return (
    <div onClick={handleSave} className="next">
      <i className="fa-solid fa-circle-arrow-right arrow"></i>
    </div>
  );
};

export default Next;
