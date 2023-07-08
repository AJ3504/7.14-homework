import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addContent } from "redux/modules/contentsSlice";

const Main_ContentList = () => {
  //useSelector
  const contents = useSelector((state) => state.contentsSlice);

  //hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Event Handler
  const onContentClick = (contentId) => {
    navigate(`/detail/${contentId}`);
  };

  // //❶R : axios로 GET 요청
  // const fetchContents = async () => {
  //   //dB.GET
  //   const { data } = await axios.get("http://localhost:4000/contents");

  //   //redux THUNK
  // };

  // useEffect(() => {
  //   fetchContents();
  // }, []);

  return (
    <>
      {/* 메인페이지 랜더링부분 */}
      {contents?.map((content) => {
        return (
          <div
            key={content.id}
            style={{
              border: "solid",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{content.title}</h3>
            <p>{content.body}</p>
            <button onClick={() => onContentClick(content.id)}>
              게시글 상세보기
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Main_ContentList;
