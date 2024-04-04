import React from "react";
import { useState } from "react";
import Layout from "../components/layout/Layout";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import tcicon from "../assets/icon/tccolor.png";
import "react-notifications/lib/notifications.css";
import { tsuccess, terror, twarn } from "../components/messages/Message";
import { useParams } from "react-router-dom";
import ConfirmUser from "../components/formInput/ConfirmUser";

function ConfirmAccount() {
    const navigate = useNavigate();
    const { token } = useParams();
    const [inputs, setInputs] = useState({
    password: "",
    passwordAgain:"",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  function validatePassword(pw1, pw2) {
    if(pw1 === pw2) {
      return true;
    }
    return false;
  }

  const handleChangePassword = (event) => {
    event.preventDefault();

    if(validatePassword(inputs.password, inputs.passwordAgain)) {
        fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/confirm/${token}`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            password: inputs.password
            },            
    }).then(async (response) => {
    if(response.ok) {
      tsuccess("You are sucessfully confirmed your account. Please login to continue.");
      navigate("/login");
    }
  }).catch((error) => {
    console.error("There was an error: " + error.message);
  });
  };
    }


  return (
    <Layout data-testid="login">
      <div className="login-outer-container">
        <div className="login-page-wrap">
          <div className="header-profile">
            <h1>New Password</h1>
            <img src={tcicon} alt="" />
          </div>
            <ConfirmUser inputs={inputs} handleChange={handleChange} handlePasswordReset={handleChangePassword} />
        </div>
      </div>
    </Layout>
  );
}
export default ConfirmAccount;