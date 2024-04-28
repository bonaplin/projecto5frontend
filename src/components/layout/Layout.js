import React from "react";
import Footer from "../footer/Footer";
import "./Layout.css";

function Layout({ children }) {
  return (
    <div className="layout">
      <div className="main-content">{children}</div>
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
