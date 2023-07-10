//axios 관련 요청이 들어가는 모든 모듈
import axios from "axios";
import { useEffect } from "react";

//1. 데이터 조회
const getContents = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/contents`
    );
    console.log("콘솔2", response.data);

    return response.data; // response.data를 반환해야 useQuery의 addContent에서 데이터를 받을 수 있음
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// const getContents = async () => {
//   const response = await axios.get(
//     `${process.env.REACT_APP_SERVER_URL}/contents`
//   );
//   console.log("콘솔2", response);
//   return response; //response를 return해줘야, useQuery에서 addContent에 대한 응답 부분을 data로 받을 수 있음
// };

export { getContents };
