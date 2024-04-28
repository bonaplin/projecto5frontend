import React from "react";
import { useState } from "react";
import Dropdown from "../dropdown/Dropdown.js";
import AsideOffcanvas from "../chat/AsideOffCanvas.js";

const DropdownMobile = ({ usernameDD, setUsernameDD, categoryDD, setCategoryDD, userNames, categoriesNames, t }) => {
  const [show, setShow] = useState(false);

  function handleClickFilter() {
    setShow(true);
  }

  return (
    <div>
      <button onClick={handleClickFilter}>Filter</button>
      <button>Order</button>
      <AsideOffcanvas show={show} handleClose={() => setShow(false)} user={usernameDD} />
    </div>
  );
};

export default DropdownMobile;
