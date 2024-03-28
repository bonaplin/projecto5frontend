import React from "react";
import "./Footer.css";

function Footer() {
  function year() {
    return new Date().getFullYear();
  }

  return (
    <footer>
      <p>&copy; {year()} Scrum Board. Projeto 4 - Ricardo Carvalho.</p>
    </footer>
  );
}

export default Footer;
