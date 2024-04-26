import React, { useState } from "react";
import Modal from "./Modal";
import FormInput from "../formInput/FormInput";
import FormSelect from "../formInput/FormSelect";
import { useTranslation } from "react-i18next";
const UserModal = ({ open, onClose, onSubmit, title, user = {} }) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [email, setEmail] = useState(user.email);
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [phone, setPhone] = useState(user.phone);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [role, setRole] = useState(user.role);
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    let userData = {
      username,
      password,
      email,
      firstname,
      lastname,
      phone,
      photoURL,
      role,
    };

    if (title === "Edit User") {
      delete userData.password;
    }

    onSubmit(userData);
    resetForm();
  };
  const resetForm = () => {
    setRole("");
    setUsername("");
    setPassword("");
    setEmail("");
    setFirstname("");
    setLastname("");
    setPhone("");
    setPhotoURL("");
    onClose();
  };

  const createUser = t("Create User");
  const deleteUser = t("Delete User");
  const deleteUserTasks = t("Delete User Tasks");

  return (
    <Modal open={open} onClose={onClose} title={title}>
      {title === deleteUser || title === deleteUserTasks ? (
        <form onSubmit={handleSubmit}>
          <div className="delete-modal-headers">
            {title === deleteUser ? (
              <p>{t("Are you sure you want to delete this user?")}</p>
            ) : (
              <p>{t("Are you sure you want to delete this user's tasks?")}</p>
            )}{" "}
          </div>
          <div className="button-container">
            <button type="submit" className="yes yes-no">
              {t("Yes")}
            </button>
            <button type="button" className="no yes-no" onClick={onClose}>
              {t("No")}
            </button>
          </div>
        </form>
      ) : (
        <>
          <img src={photoURL} alt="User" />
          <form onSubmit={handleSubmit}>
            <FormSelect
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              options={[
                { value: "po", label: t("Product Owner") },
                { value: "sm", label: t("Scrum Master") },
                { value: "dev", label: t("Developer") },
              ]}
            />

            {title === createUser && (
              <>
                <FormInput placeholder="Enter username" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <FormInput
                  placeholder="Enter password (optional)"
                  type="password"
                  name="passwordNew"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </>
            )}
            <FormInput placeholder={t("Enter email")} type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <FormInput placeholder={t("Enter first name")} type="text" name="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
            <FormInput placeholder={t("Enter last name")} type="text" name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
            <FormInput placeholder={t("Enter phone number")} type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <FormInput placeholder={t("Enter photo URL")} type="url" name="photoURL" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
            <div className="button-container">
              <button type="submit" className="yes-no yes">
                {t("Save")}
              </button>
              <button type="button" className="yes-no no" onClick={onClose}>
                {t("Cancel")}
              </button>
            </div>
          </form>
        </>
      )}
    </Modal>
  );
};

export default UserModal;
