import { getContents } from "api/contents";
import React from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StButton } from "styled-components/StButton";

const BookCategory = () => {
  //hooks
  const navigate = useNavigate();

  //게시글 data
  const { isLoading, isError, data } = useQuery("contents", getContents);
  const categorizedData = data.filter((item) => item.category === "책");

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
      },
    });
  };

  return (
    <div>
      {categorizedData?.map((content) => {
        return (
          <div
            key={content.category}
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
            <ul>
              <li>
                {content?.newTitle ? content?.newTitle : content?.title}
                <br />
                {content?.newBody ? content?.newBody : content?.body}
              </li>
              <StButton onClick={() => onContentClick(content)}>
                게시글 상세보기
              </StButton>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default BookCategory;
