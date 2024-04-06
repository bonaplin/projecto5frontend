import React from "react";
import "../formInput/FormInput.css";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import TitleOutlinedIcon from "@mui/icons-material/TitleOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

const ProfileDisplay = ({ name, value }) => {
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
      case "passwordAgain":
        return <LockIcon style={{ marginRight: "10px", marginLeft: "10px" }} />;
      case "passwordNew":
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

  return (
    <div className="form-input">
      {getIcon(name)}
      <p>{value}</p>
    </div>
  );
};

export default ProfileDisplay;
