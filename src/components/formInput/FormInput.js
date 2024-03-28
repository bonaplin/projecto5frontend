import React, { useState } from "react";
import "./FormInput.css";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import TitleOutlinedIcon from "@mui/icons-material/TitleOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
const FormInput = ({ placeholder, type, name, value, onChange }) => {
  const getIcon = (name) => {
    switch (name) {
      case "username":
        return (
          <Person2OutlinedIcon
            style={{ marginRight: "10px", marginLeft: "10px" }}
          />
        );
      case "password":
        return <LockIcon style={{ marginRight: "10px", marginLeft: "10px" }} />;
      case "password-again":
        return <LockIcon style={{ marginRight: "10px", marginLeft: "10px" }} />;
      case "password-new":
        return <LockIcon style={{ marginRight: "10px", marginLeft: "10px" }} />;
      case "email":
        return (
          <EmailIcon style={{ marginRight: "10px", marginLeft: "10px" }} />
        );
      case "firstname":
        return (
          <BadgeIcon style={{ marginRight: "10px", marginLeft: "10px" }} />
        );
      case "lastname":
        return (
          <BadgeIcon style={{ marginRight: "10px", marginLeft: "10px" }} />
        );
      case "phone":
        return (
          <ContactPhoneIcon
            style={{ marginRight: "10px", marginLeft: "10px" }}
          />
        );
      case "photoURL":
        return (
          <AddAPhotoIcon style={{ marginRight: "10px", marginLeft: "10px" }} />
        );
      case "title":
        return (
          <TitleOutlinedIcon
            style={{ marginRight: "10px", marginLeft: "10px" }}
          />
        );

      case "date":
        return (
          <EditCalendarOutlinedIcon
            style={{ marginRight: "10px", marginLeft: "10px" }}
          />
        );
      case "finaldate":
        return (
          <EditCalendarOutlinedIcon
            style={{ marginRight: "10px", marginLeft: "10px" }}
          />
        );
      case "description":
        return (
          <DescriptionOutlinedIcon
            style={{ marginRight: "10px", marginLeft: "10px" }}
          />
        );
      default:
        return null;
    }
  };
  const [charCount, setCharCount] = useState(value?.length || 0);
  const maxLenght = 200;
  const handleTextChange = (event) => {
    onChange(event);
    setCharCount(event.target.value.length);
  };

  return (
    <div className="form-input">
      {getIcon(name)}

      {name === "description" ? (
        <div className="description-input">
          <textarea
            required={name !== "finaldate"}
            name={name}
            style={{}}
            defaultValue={value || ""}
            onChange={handleTextChange}
            placeholder={placeholder}
            maxLength={maxLenght}
          />
          <div style={{ fontSize: "10px" }}>
            {charCount}/{maxLenght}
          </div>
        </div>
      ) : (
        <input
          required={name !== "finaldate"}
          style={{}}
          type={type}
          name={name}
          defaultValue={value || ""}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};
export default FormInput;
