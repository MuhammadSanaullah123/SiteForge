import React, { useState } from "react";

//component
import Spinner from "./Spinner";
import Alert from "./Alert";
//emailjs
import emailjs from "@emailjs/browser";

const serviceID = "service_3uq80fa";
const templateID = "template_ymvt7vf";
const PUBLIC_KEY = "fUmI0_TecHG3U-nDf";
const Contact = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInput = (e) => {
    const Value = e.target.value;

    setData({ ...data, [e.target.name]: Value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    emailjs
      .send(
        serviceID,
        templateID,

        {
          from_name: data.name,
          to_name: "Muhammad",
          from_email: data.email,
          to_email: "muhammed14336@gmail.com",
          message: data.message,
        },
        PUBLIC_KEY
      )
      .then(
        () => {
          setData({
            name: "",
            email: "",
            message: "",
          });
          setLoading(false);
          setShowAlert(true);
          setTimeout(() => {
            setOpen(false);
          }, 3000);
        },
        (error) => {
          setLoading(false);
          console.log(error);
          alert("Something went wrong");
        }
      );
  };

  return (
    <>
      {open ? (
        <div
          style={{
            opacity: `${loading ? "0.9" : "1"}`,
          }}
          id="contact"
        >
          {showAlert && (
            <Alert
              message="Message Sent"
              type="success"
              time={3000}
              setShowAlert={setShowAlert}
            />
          )}
          {loading && <Spinner />}
          <div id="headingdiv">
            <h1>Contact</h1>
            <i
              className="fa-solid fa-sort-down crossIcon"
              onClick={() => setOpen(false)}
            ></i>
          </div>
          <div id="contactd1">
            <input
              value={data.name}
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleInput}
            />
            <input
              value={data.email}
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInput}
            />
            <textarea
              value={data.message}
              cols={5}
              rows={5}
              name="message"
              placeholder="Message..."
              onChange={handleInput}
            />
            <button onClick={handleSubmit}>Send</button>
          </div>
        </div>
      ) : (
        <div id="messageIconDiv" onClick={() => setOpen(true)}>
          <i className="fa-regular fa-message messageIcon"></i>
        </div>
      )}
    </>
  );
};

export default Contact;
