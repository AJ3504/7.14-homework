import axios from "axios";

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

//3. 유저 인증 확인
const verifyUser = async () => {
  try {
    const response = await axios.get("http://3.38.191.164/user");
    console.log("3.유저 인증 콘솔>", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { addSignupUser, postLoginUser, verifyUser };
