import React from "react";

function Footer() {
  return (
    <div
      id="wrapp"
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
        }}
      >
        푸터입니다
      </footer>
    </div>
  );
}

export default Footer;
