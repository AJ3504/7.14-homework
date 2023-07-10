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
// const addContent = async (newContent) => {
//   console.log("콘솔3", response.data)
// };

const addContent = async (newContent) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/contents`,
      newContent
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//3. 데이터 삭제
const deleteContent = async (targetContentId) => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/contents/${targetContentId}` //~contents중, id(targetContentId)번째 게시글을 삭제하는 로직
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//4. 데이터 수정
const editContent = async (editedContent) => {
  try {
    await axios.patch(
      `${process.env.REACT_APP_SERVER_URL}/contents/${editedContent.id}`, //그냥 id라고 하면 인식 안되고, editContent.id라고 해야 인식
      editedContent
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getContents, addContent, deleteContent, editContent };
