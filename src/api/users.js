import axios from "axios";
import { Cookies } from "react-cookie";

//1. 유저 회원가입
const addSignupUser = async (newUser) => {
  try {
    const response = await axios.post("http://3.38.191.164/register", newUser);
    console.log("1.유저 회원가입 콘솔>", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//2. 유저 로그인
const postLoginUser = async (newLoginUser) => {
  try {
    const response = await axios.post(
      "http://3.38.191.164/login",
      newLoginUser
    );
    console.log("2.유저 로그인 콘솔>", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//3. 유저 인증 확인 후 데이터 get

const getVerifiedUserData = async () => {
  const accessToken = localStorage.getItem("accessToken"); //쿠키에 담아놨던 토큰을
  console.log("accessToken 테스트>", accessToken);
  try {
    const response = await axios.get("http://3.38.191.164/user", {
      //request headers에 담아서 get요청 보냄
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("3.유저 인증 콘솔>", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { addSignupUser, postLoginUser, getVerifiedUserData };
