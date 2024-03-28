import React, { useState } from "react";
import Modal from "./Modal";
import FormInput from "../formInput/FormInput";
import FormSelect from "../formInput/FormSelect";
const UserModal = ({ open, onClose, onSubmit, title, user = {} }) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [email, setEmail] = useState(user.email);
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [phone, setPhone] = useState(user.phone);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [role, setRole] = useState(user.role);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      username,
      password,
      email,
      firstname,
      lastname,
      phone,
      photoURL,
      role,
    });
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

  return (
    <Modal open={open} onClose={onClose} title={title}>
      {title === "Delete User" || title === "Delete User Tasks" ? (
        <form onSubmit={handleSubmit}>
          <div className="delete-modal-headers">
            {title === "Delete User" ? (
              <p>Are you sure you want to delete this user?</p>
            ) : (
              <p>Are you sure you want to delete this user's tasks?</p>
            )}
          </div>
          <div className="button-container">
            <button type="submit" className="yes yes-no">
              Yes
            </button>
            <button type="button" className="no yes-no" onClick={onClose}>
              No
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
                { value: "po", label: "Product Owner" },
                { value: "sm", label: "Scrum Master" },
                { value: "dev", label: "Developer" },
              ]}
            />

            {title === "Create User" && (
              <>
                <FormInput
                  placeholder="Enter username"
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <FormInput
                  placeholder="Enter password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </>
            )}
            <FormInput
              placeholder="Enter email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              placeholder="Enter first name"
              type="text"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <FormInput
              placeholder="Enter last name"
              type="text"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <FormInput
              placeholder="Enter phone number"
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <FormInput
              placeholder="Enter photo URL"
              type="url"
              name="photoURL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
            <div className="button-container">
              <button type="submit" className="yes-no yes">
                Save
              </button>
              <button type="button" className="yes-no no" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </>
      )}
    </Modal>
  );
};

export default UserModal;
