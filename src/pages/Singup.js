import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/formInput/FormInput";
import Layout from "../components/layout/Layout";
import icon from "../assets/icon/tccolor.png";
import "../pages/Singup.css";
import { userStore } from "../stores/UserStore";
import { tsuccess, terror, twarn } from "../components/messages/Message";
function Singup() {
  const navigate = useNavigate();
  const [imgURL, setImgURL] = useState("");
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    photoURL: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/user/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then(async (response) => {
        const data = await response.json();

        if (response.ok) {
          tsuccess("Registration successful");
          navigate("/login", { replace: true });
        } else {
          switch (response.status) {
            case 400:
              twarn(data.message); // One or more parameters are null or blank, Invalid email format, Invalid phone number format, Invalid URL format
              break;
            case 409:
              twarn(data.message); // Invalid Username or Email
              break;
            case 401:
              twarn(data.message); // Unauthorized
              break;
            default:
              terror("An error occurred: " + data.message);
              break;
          }
        }
      })
      .catch((error) => {
        terror("There was an error: " + error.message);
      });
  };

  return (
    <Layout>
      <div className="signup-outer-container">
        <div className="signup-page-wrap">
          <div className="header-profile">
            <h1>Sign Up </h1>
            <img src={icon} alt="icon" />
          </div>
          <form onSubmit={handleSubmit}>
            <FormInput
              placeholder="Enter your username"
              type="text"
              name="username"
              value={inputs.username}
              onChange={handleChange}
            />
            <FormInput
              placeholder="Enter your password"
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
            <FormInput
              placeholder="Enter your email address"
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
            <FormInput
              placeholder="Enter your first name"
              type="text"
              name="firstname"
              value={inputs.firstname}
              onChange={handleChange}
            />
            <FormInput
              placeholder="Enter your last name"
              type="text"
              name="lastname"
              value={inputs.lastname}
              onChange={handleChange}
            />
            <FormInput
              placeholder="Enter your phone number"
              type="tel"
              name="phone"
              value={inputs.phone}
              onChange={handleChange}
            />
            <FormInput
              id="photoURL"
              placeholder="Enter your photo URL"
              type="url"
              name="photoURL"
              value={inputs.photoURL}
              onChange={(e) => {
                setImgURL(e.target.value);
                handleChange(e);
              }}
            />

            <div className="button-group">
              <input type="submit" value="Submit" />
              <input
                type="button"
                value="Login"
                onClick={() => navigate("/login")}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Singup;
