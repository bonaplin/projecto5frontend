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
import { useTranslation } from "react-i18next";

function EditProfile() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const { username, token, role, firstname, lastname, photoURL, email, phone, updateUser } = userStore((state) => state);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: username,
    email: email,
    firstname: firstname,
    lastname: lastname,
    phone: phone,
    photoURL: photoURL,
    role: role,
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

    const selectedUser = userStore.getState().username; // Get the username from the Zustand store

    // console.log("inputs", JSON.stringify(inputs));
    const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/${selectedUser}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(inputs), // Send the inputs as the body of the request
    });

    const data = await response.json();

    if (response.ok) {
      tsuccess(t("Profile updated successfully"));
      updateUser(inputs); // Update the user in the Zustand store
    } else {
      switch (response.status) {
        case 400:
          twarn(t(data.message));
          break;
        case 401:
          twarn(t(data.message));
          break;
        case 409:
          twarn(t(data.message));
          break;
        default:
          terror(t("An error occurred: ") + t(data.message));
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
      twarn(t("New password and confirmation password do not match."));
      return;
    }
    //console.log(oldPassword + " old " + newPassword + " new");
    // Send the old password and new password to the backend
    const selectedUser = userStore.getState().username; // Get the username from the Zustand store
    const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/${selectedUser}/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: userStore.getState().token,
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      tsuccess(t("Password changed successfully."));
      onCloseModal();
    } else {
      switch (response.status) {
        case 400:
          twarn(t(data.message));
          break;
        case 401:
          terror(t(data.message));
          break;
        default:
          terror(t("An error occurred: ") + t(data.message));
          break;
      }
    }
  };
  return (
    <>
      {/* <Header /> */}
      <Layout>
        <div className="edit-profile-outer-container">
          <div className="edit-profile-page-wrap">
            <div className="header-profile">
              <h1>{t("Edit Profile")}</h1>
              <img src={inputs.photoURL} alt="Profile" className="edit-profile-img" />{" "}
            </div>
            <form onSubmit={handleSubmit}>
              {inputs.role === "po" && (
                <FormSelect
                  name="role"
                  value={inputs.role}
                  onChange={handleChange}
                  options={[
                    { value: "po", label: t("Product Owner") },
                    { value: "sm", label: t("Scrum Master") },
                    { value: "dev", label: t("Developer") },
                  ]}
                />
              )}
              <FormInput placeholder={t("Enter your email address")} type="email" name="email" value={inputs.email} onChange={handleChange} />
              <FormInput placeholder={t("Enter your first name")} type="text" name="firstname" value={inputs.firstname} onChange={handleChange} />
              <FormInput placeholder={t("Enter your last name")} type="text" name="lastname" value={inputs.lastname} onChange={handleChange} />
              <FormInput placeholder={t("Enter your phone number")} type="tel" name="phone" value={inputs.phone} onChange={handleChange} />
              <FormInput placeholder={t("Enter your photo URL")} type="url" name="photoURL" value={inputs.photoURL} onChange={handleChange} />
              <div className="button-group">
                <input type="submit" value={t("Save")} className="yes-no yes" />
                <input className="yes-no no" type="button" value={t("Cancel")} onClick={() => navigate("/scrum-board")} />
              </div>
            </form>

            <button
              type="submit"
              value={t("Change Password")}
              onClick={onOpenModal}
              style={{
                color: "blue",
                textDecoration: "underline",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {t("Change Password")}
            </button>
            <Modal open={open} onClose={onCloseModal} center title={t("Change Password")}>
              <FormInput placeholder={t("Enter your old password")} type="password" name="password" value={oldPassword} onChange={handlePasswordChange} />
              <FormInput
                placeholder={t("Enter your new password")}
                type="password"
                name="password-new"
                value={newPassword}
                onChange={handlePasswordChange}
              />
              <FormInput
                placeholder={t("Enter your new password again")}
                type="password"
                name="password-again"
                value={confirmPassword}
                onChange={handlePasswordChange}
              />
              <div className="button-group">
                <button type="submit" value={t("Change Password")} onClick={handleClickSavePassword} className="yes-no yes">
                  {t("Save")}
                </button>
                <button className="yes-no no" type="button" value={t("Cancel")} onClick={onCloseModal}>
                  {t("Cancel")}
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
