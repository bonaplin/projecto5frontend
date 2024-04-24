import React from "react";

const Dropdown = ({ data, onChange, type, value }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  console.log(data);
  console.log(data.value);
  console.log(data.username);
  return (
    <select value={value || ""} onChange={handleChange} style={{ width: "100%" }}>
      <option value="" disabled>
        {type}
      </option>
      {Array.isArray(data) &&
        data.map((item, index) => (
          <option key={index} value={item.value}>
            {item}
          </option>
        ))}
    </select>
  );
};

export default Dropdown;
