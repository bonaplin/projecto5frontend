import React from "react";
import "./FormInput.css";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
import CategoryIcon from "@mui/icons-material/Category";
const FormSelect = ({ name, options, value, onChange }) => {
  const getIcon = (name) => {
    switch (name) {
      case "status":
        return (
          <CategoryOutlinedIcon
            style={{ marginRight: "10px", marginLeft: "10px" }}
          />
        );
      case "category":
        return (
          <ClassOutlinedIcon
            style={{ marginRight: "10px", marginLeft: "10px" }}
          />
        );
      case "priority":
        return (
          <PriorityHighOutlinedIcon
            style={{ marginRight: "10px", marginLeft: "10px" }}
          />
        );
      case "role":
        return (
          <CategoryIcon style={{ marginRight: "10px", marginLeft: "10px" }} />
        );

      default:
        return null;
    }
  };

  return (
    <div className="form-input">
      {getIcon(name)}
      <select value={value} onChange={onChange} required>
        {value === "" && <option value="">Select an option...</option>}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
