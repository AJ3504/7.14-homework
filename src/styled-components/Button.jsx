import React from "react";
import { styled } from "styled-components";

const Button = () => {
  return (
    <>
      <h2>연습</h2>
      <StButton></StButton>
    </>
  );
};

const StButton = styled.button`
  color: red;
  border: none;
  cursor: pointer;
  border-radius: 8px;
`;
export default Button;
