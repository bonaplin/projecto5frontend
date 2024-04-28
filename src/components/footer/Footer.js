import React from "react";
import "./Footer.css";

function Footer() {
  function year() {
    return new Date().getFullYear();
  }

  return (
    <footer>
      <p>&copy; {year()} Scrum Board. Final - Ricardo Carvalho.</p>
    </footer>
  );
}

export default Footer;
