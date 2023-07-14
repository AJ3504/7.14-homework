import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import shortid from "shortid";

const userSlice = createSlice({
  name: "user",
  initialState: [
    {
      id: shortid.generate(),
      pw: "test",
      email: "test@gmail.com",
      userName: "이안진",
      isLogin: false, //true로 지정하면 콘솔 뜨고, false로 지정하면 undefined 뜸
    },
  ],

  reducers: {
    //로그인 : 사용자가 입력한 email, id가 state 속 email, id와 같다면, isLogin 속성을 반대로 바꿔줌 (false -> true)
    login: (state, action) => {
      console.log("테2", action);

      return state.map((user) => {
        console.log("테3", action.payload.email);
        console.log("테4", action.payload.pw);
        console.log("테5", user.email);
        console.log("테6", user.pw);
        if (
          user.email === action.payload.email &&
          user.pw === action.payload.pw
        ) {
          return { ...user, isLogin: !user.isLogin };
        } else {
          return user;
        }
      });
    },

    join: (state, action) => {
      const reduxNewUSer = {
        email: action.payload.email,
        pw: action.payload.pw,
        userName: action.payload.name,
        isLogin: false,
      };

      state.push(reduxNewUSer);
    },

    logout: (state, action) => {
      //isLogin을 false로 만들어주는 작업 필요 : map으로 하나하나 돌면서, 걸리면 isLogin을 false로 바꿔줌
      //action.payload에는, 로그인유저의 shortId가 담겨있음
      console.log("테7", action.payload);
      return state.map((user) => {
        return { ...user, isLogin: false }; //!isLogin도 당연히 가능
      });
    },
  },
});

export const { login, join, logout } = userSlice.actions;
export default userSlice.reducer;
