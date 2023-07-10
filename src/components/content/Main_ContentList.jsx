import { getContents } from "api/contents";
import axios from "axios";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Main_ContentList = () => {
  //hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //useSelector
  //ASIS// const contents = useSelector((state) => state.contentsSlice);
  //TOBE
  const { isLoading, isError, data } = useQuery("contents", getContents); //첫번째인자(쿼리 이름)

  if (isLoading) {
    return <h1>로딩중입니다🥲</h1>;
  }
  if (isError) {
    return <h1>에러가 발생했습니다🥲</h1>;
  }

  //Event Handler
  const onContentClick = (contentId) => {
    navigate(`/detail/${contentId}`);
  };

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
              fontWeight: "bold",
            }}
          >
            <div className="editedContent">
              <ul>
                <li>
                  {content?.newTitle ? content?.newTitle : content?.title}
                  <br />
                  {content?.newBody ? content?.newBody : content?.body}
                </li>
                <button onClick={() => onContentClick(content.id)}>
                  게시글 상세보기
                </button>
              </ul>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Main_ContentList;
