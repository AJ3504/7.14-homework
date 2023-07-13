import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "redux/modules/userSlice";

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
      localStorage.removeItem("accessToken");
      //
      // dispatch(logout(loginUser.email));
      alert("로그아웃되었습니다!");
    }
  };

  return (
    <>
      <div style={{ height: "40%", marginTop: "20px" }}>
        <button
          type="submit"
          style={{ height: "100%" }}
          onClick={onClickLogoutHandler}
          // disabled={isDisabled}
        >
          로그아웃👆
        </button>
      </div>
    </>
  );
}

export default Logout;
