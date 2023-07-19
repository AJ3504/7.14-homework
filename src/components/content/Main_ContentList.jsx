import { getContents } from "api/contents";
import { getVerifiedUserData, signupUser } from "api/users";
import axios from "axios";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StButton } from "styled-components/StButton";

const Main_ContentList = () => {
  //hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //게시글 data
  const { isLoading, isError, data } = useQuery("contents", getContents); //첫번째인자인 key값이 중요 (나중에 invalidate할 때 쓰임), 두번째 인자는 비동기함수

  if (isLoading) {
    return <h1>로딩중입니다🥲</h1>;
  }
  if (isError) {
    return <h1>에러가 발생했습니다🥲</h1>;
  }

  //Event Handler
  const onContentClick = (content) => {
    navigate(`/detail/${content.id}`, {
      state: {
        prevTitle: content.title,
        prevBody: content.body,
        contentId: content.id,
        prevWriterId: content.writerId,
        prevWriterName: content.writerName,
        prevCategory: content.category,
      },
    });
  };

  return (
    <>
      {/* 메인페이지 랜더링부분 */}
      {/* 비동기함수이므로, 데이터가 내려오기 전 화면 랜더링이 될 수도 있기 때문에 ?을 꼭 붙여주기 */}
      {data?.map((content) => {
        return (
          <div
            key={content.id}
            style={{
              border: "solid",
              borderColor: "#ecc77d",
              backgroundColor: "#ecc77d",
              borderWidth: "5px",
              margin: "10px",
              padding: "10px",
              fontWeight: "bold",
            }}
          >
            <div className="mainContentList">
              <ul>
                <li>
                  {content.title}
                  <br />
                  {content.body}
                </li>
                <StButton onClick={() => onContentClick(content)}>
                  게시글 상세보기
                </StButton>
              </ul>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Main_ContentList;
