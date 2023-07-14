import React from "react";
import { styled } from "styled-components";

export const StButton = styled.button`
  color: #ecc77d;
  background-color: #fff9e3;
  border: none;
  cursor: pointer;
  border-radius: 3px;
  transition: background-color 0.2s ease;
  font-family: "NeoDunggeunmoPro-Regular", sans-serif;
  margin-top: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 4px;
  padding-right: 4px;
  &:hover {
    background-color: #636e5fda;
  }
`;
