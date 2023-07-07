import React from "react";
import { useSelector } from "react-redux";

const Main_ContentList = () => {
  //useSelector
  const contents = useSelector((state) => state.content);
  console.log("콘솔1", contents);

  //hooks

  return (
    <>
      {/* 메인페이지 랜더링부분 */}
      {contents.map((content) => {
        return (
          <div
            key={content.id}
            style={{ border: "solid", margin: "10px", padding: "10px" }}
          >
            <h3>{content.title}</h3>
            <p>{content.body}</p>
          </div>
        );
      })}
    </>
  );
};

export default Main_ContentList;
