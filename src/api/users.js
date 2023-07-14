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

//3. 로컬스토리지에 저장된 토큰을 가지고 get요청

const getVerifiedUserData = async () => {
  const accessToken = localStorage.getItem("accessToken"); //로컬스토리지에 담아놨던 토큰을
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
    //에러 메세지
    if (
      error.response.status === 401 &&
      error.response.data.message.includes("토큰이 만료되었습니다.")
    ) {
      alert("로그인이 만료되었습니다. 재로그인해주세요!");
    }
  }
};

export { addSignupUser, postLoginUser, getVerifiedUserData };
