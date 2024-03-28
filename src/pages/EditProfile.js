import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { userStore } from "../stores/UserStore";
import Layout from "../components/layout/Layout";
import FormInput from "../components/formInput/FormInput";
import FormSelect from "../components/formInput/FormSelect";
import "./EditProfile.css";
import Header from "../components/header/Header";
import "react-responsive-modal/styles.css";
// import { Modal } from "react-responsive-modal";
import Modal from "../components/modal/Modal";
import { tsuccess, terror, twarn } from "../components/messages/Message";
function EditProfile() {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const location = useLocation();
  //const userDetails = userStore.getState().userDetails; // Adicione esta linha
  // console.log(JSON.stringify(userDetails) + "user details");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: userStore.getState().username,
    email: userStore.getState().email,
    firstname: userStore.getState().firstname,
    lastname: userStore.getState().lastname,
    phone: userStore.getState().phone,
    photoURL: userStore.getState().photoURL,
    role: userStore.getState().role,
  });

  // console.log("inputs", JSON.stringify(inputs));
  const handleChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  /*Editar profile*/
  async function handleSubmit(event) {
    event.preventDefault();

    const token = userStore.getState().token; // Get the token from the Zustand store
    const selectedUser = userStore.getState().username; // Get the username from the Zustand store

    // console.log("inputs", JSON.stringify(inputs));
    const response = await fetch(
      `http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/${selectedUser}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(inputs), // Send the inputs as the body of the request
      }
    );

    const data = await response.json();

    if (response.ok) {
      // If the response is successful, update the user details in the Zustand store
      tsuccess("Profile updated successfully");
    } else {
      switch (response.status) {
        case 400:
          twarn(data.message); // Invalid email format, Invalid phone number format, Invalid URL format
          break;
        case 401:
          twarn(data.message); // Unauthorized
          break;
        case 409:
          twarn(data.message); // Email already exists
          break;
        default:
          terror("An error occurred: " + data.message);
          break;
      }
    }
    navigate("/scrum-board");
  }

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    //console.log("name", name);
    if (name === "password") {
      setOldPassword(value);
      //console.log("old", value);
    } else if (name === "password-new") {
      setNewPassword(value);
      //c//onsole.log("new", value);
    } else if (name === "password-again") {
      setConfirmPassword(value);
      //console.log("new confirm", value);
    }
  };
  const handleClickSavePassword = async () => {
    if (newPassword !== confirmPassword) {
      //console.log(newPassword + " new " + confirmPassword + " confirm");
      twarn("New password and confirmation password do not match.");
      return;
    }
    //console.log(oldPassword + " old " + newPassword + " new");
    // Send the old password and new password to the backend
    const selectedUser = userStore.getState().username; // Get the username from the Zustand store
    const response = await fetch(
      `http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/${selectedUser}/password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: userStore.getState().token,
        },
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      tsuccess("Password changed successfully.");
      onCloseModal();
    } else {
      switch (response.status) {
        case 400:
          twarn(data.message); // Old password is incorrect, Invalid Parameters
          break;
        case 401:
          terror(data.message); // Unauthorized
          break;
        default:
          terror("An error occurred: " + data.message);
          break;
      }
    }
  };
  return (
    <>
      <Header />
      <Layout>
        <div className="edit-profile-outer-container">
          <div className="edit-profile-page-wrap">
            <div className="header-profile">
              <h1>Edit Profile</h1>
              <img
                src={inputs.photoURL}
                alt="Profile"
                className="edit-profile-img"
              />{" "}
            </div>
            <form onSubmit={handleSubmit}>
              {inputs.role === "po" && (
                <FormSelect
                  name="role"
                  value={inputs.role}
                  onChange={handleChange}
                  options={[
                    { value: "po", label: "Product Owner" },
                    { value: "sm", label: "Scrum Master" },
                    { value: "dev", label: "Developer" },
                  ]}
                />
              )}
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
                placeholder="Enter your photo URL"
                type="url"
                name="photoURL"
                value={inputs.photoURL}
                onChange={handleChange}
              />

              <div className="button-group">
                <input type="submit" value="Save" className="yes-no yes" />
                <input
                  className="yes-no no"
                  type="button"
                  value="Cancel"
                  onClick={() => navigate("/scrum-board")}
                />
              </div>
            </form>

            <button
              type="submit"
              value="Change Password"
              onClick={onOpenModal}
              style={{
                color: "blue",
                textDecoration: "underline",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Change Password
            </button>
            <Modal
              open={open}
              onClose={onCloseModal}
              center
              title="Change Password"
            >
              <FormInput
                placeholder="Enter your old password"
                type="password"
                name="password"
                value={oldPassword}
                onChange={handlePasswordChange}
              />
              <FormInput
                placeholder="Enter your new password"
                type="password"
                name="password-new"
                value={newPassword}
                onChange={handlePasswordChange}
              />
              <FormInput
                placeholder="Enter your new password again"
                type="password"
                name="password-again"
                value={confirmPassword}
                onChange={handlePasswordChange}
              />
              <div className="button-group">
                <button
                  type="submit"
                  value="Change Password"
                  onClick={handleClickSavePassword}
                  className="yes-no yes"
                >
                  Save
                </button>
                <button
                  className="yes-no no"
                  type="button"
                  value="Cancel"
                  onClick={onCloseModal}
                >
                  Cancel
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default EditProfile;
