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

//2. 데이터 추가
const addContent = async (newContent) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/contents`, newContent);
};

export { getContents, addContent };
