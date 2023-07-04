import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <p style={{ margin: 0 }}>
        &copy; {currentYear} Manoj Vaishnav. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
