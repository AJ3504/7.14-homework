import { hover } from "@testing-library/user-event/dist/hover";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "redux/modules/userSlice";
import { StButton } from "styled-components/StButton";

function Logout() {
  //UseSelector
  const userList = useSelector((state) => state.userSlice);
  const loginUser = userList.find((user) => user.isLogin === true);

  //hooks
  const dispatch = useDispatch();

  //
  const accessToken = localStorage.getItem("accessToken");
  const isDisabled = !accessToken;

  //Event Handler
  const onClickLogoutHandler = async (e) => {
    //
    e.preventDefault();
    const isConfirmed = window.confirm("로그아웃하시겠습니까?");
    if (isConfirmed) {
      //
      dispatch(logout(loginUser.email));
      //
      localStorage.removeItem("accessToken");
      alert("로그아웃되었습니다!");
    }
  };

  return (
    <>
      <div style={{ height: "40%", marginTop: "20px" }}>
        <StButton
          type="submit"
          style={{
            height: "100%",
            backgroundColor: "#a1b39b66",
            color: "black",
          }}
          onClick={onClickLogoutHandler}
          // disabled={isDisabled}
        >
          <div style={{ position: "relative", bottom: "5px", left: "1px" }}>
            로그아웃👆
          </div>
        </StButton>
      </div>
    </>
  );
}

export default Logout;
