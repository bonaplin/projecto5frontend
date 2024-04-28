import React from "react";
import Dropdown from "../dropdown/Dropdown.js";

const DropdownLaptop = ({ usernameDD, setUsernameDD, categoryDD, setCategoryDD, userNames, categoriesNames, t }) => (
  <div className="filter-container">
    <div className="filter-side">
      <Dropdown className="filter-dropdown" value={usernameDD} data={userNames} type={t("Username")} onChange={(e) => setUsernameDD(e)} />
      <Dropdown className="filter-dropdown" value={categoryDD} data={categoriesNames} type={t("Category")} onChange={(e) => setCategoryDD(e)} />
    </div>
  </div>
);
export default DropdownLaptop;
