import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import shortid from "shortid";

const userSlice = createSlice({
  name: "user",
  initialState: [
    {
      id: shortid.generate(),
      pw: "test",
      email: "test@gmial.com",
      userName: "이안진",
      isLogin: false, //true로 지정하면 콘솔 뜨고, false로 지정하면 undefined 뜸
    },
  ],
  reducers: {
    //로그인 : 사용자가 입력한 email, id가 state 속 email, id와 같다면, isLogin 속성을 반대로 바꿔줌 (false -> true)
    login: (state, action) => {
      console.log("action 테스트>", action);
      console.log(state);

      return state.map((user) => {
        console.log(action.payload.email); //이렇게 action.payload로 하면 콘솔에 로그인값이 찍히는데,
        console.log(action.payload.pw);
        console.log(user.email); //user으로 하면 로그인값 안찍히는걸로 봐선
        console.log(user.pw);

        if (
          user.email === action.payload.email &&
          user.pw === action.payload.pw
        ) {
          console.log("제발>", user.email); //user으로 하면 로그인값 안찍히는걸로 봐선
          console.log("제발2>", user.pw);
          return { ...user, isLogin: !user.isLogin };
        } else {
          return user;
        }
      });
    },

    join: (state, action) => {
      const newUser = {
        id: shortid.generate(),
        email: action.payload.email,
        pw: action.payload.pw,
        userName: action.payload.name,
        isLogin: false,
      };

      state.push(newUser);
    },
  },
});

export const { login, join } = userSlice.actions;
export default userSlice.reducer;
