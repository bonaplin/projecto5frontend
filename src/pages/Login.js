import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/formInput/FormInput";
import Layout from "../components/layout/Layout";
import "./Login.css";
import { userStore } from "../stores/UserStore";
import { Link } from "react-router-dom";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import tcicon from "../assets/icon/tccolor.png";
import "react-notifications/lib/notifications.css";
import { tsuccess, terror, twarn } from "../components/messages/Message";

function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  //console.log(inputs);
  const updateUsername = userStore((state) => state.updateUsername);
  const updateRole = userStore((state) => state.updateRole);
  const updateToken = userStore((state) => state.updateToken);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    //console.log("handleSubmit called");

    event.preventDefault();

    // Send a POST request to the login endpoint
    fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        username: inputs.username,
        password: inputs.password,
      },
    })
      .then(async (response) => {
        const data = await response.json();

        if (response.ok) {
          updateUsername(data.username);
          updateRole(data.role);
          updateToken(data.token);
          tsuccess("Login successful");
          navigate("/scrum-board", { replace: true }); // Cant go back in browser.
        } else {
          switch (response.status) {
            case 401:
              twarn(data.message); // Login Failed
              break;
            case 403:
              twarn(data.message); // User is not active
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
    <Layout data-testid="login">
      <div className="login-outer-container">
        <div className="login-page-wrap">
          <div className="header-profile">
            <h1>Login</h1>
            <img src={tcicon} alt="" />
          </div>
          <form data-testid="login-form" onSubmit={handleSubmit}>
            <FormInput
              icon={<Person2OutlinedIcon />}
              placeholder={"Enter your username"}
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
            <input type="submit" value="Login" />
          </form>
          <p className="small-text">
            New to ScrumBoard?{" "}
            <Link
              to="/singup"
              className="signup-link"
              style={{ color: "blue" }}
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
export default Login;
