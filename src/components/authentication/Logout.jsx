import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "redux/modules/userSlice";

function Logout() {
  //UseSelector
  const userList = useSelector((state) => state.userSlice);
  const loginUser = userList.find((user) => user.isLogin === true);
  // console.log("userList테스트5>", userList);
  // console.log("loginUser 테스트6>", loginUser);

  //hooks
  const dispatch = useDispatch();

  //Event Handler

  return (
    <>
      <div style={{ height: "40%", marginTop: "20px" }}>
        <button
          type="submit"
          style={{ height: "100%" }}
          onClick={() => {
            const isConfirmed = window.confirm("로그아웃하시겠습니까?");
            if (isConfirmed) {
              dispatch(logout(loginUser.id)); //action.payload로, 로그인유저의 shortid를 넘겨주어야함
            }
          }}
        >
          로그아웃👆
        </button>
      </div>
    </>
  );
}

export default Logout;
