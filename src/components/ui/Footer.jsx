import React from "react";

function Footer() {
  return (
    <div
      id="wrap"
      style={{
        minHeight: "100vh",
        position: "relative",
        width: "100%",
      }}
    >
      <footer
        style={{
          width: "100%",
          height: "120px",
          bottom: "0px",
          position: "absolute",
          backgroundColor: "#606C5D",
          width: "100%",
          position: "fixed",
        }}
      >
        푸터입니다
      </footer>
    </div>
  );
}

export default Footer;
