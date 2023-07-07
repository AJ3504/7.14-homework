import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Detail_Content = () => {
  //UseSelectors
  const contents = useSelector((state) => state.contentsSlice);

  //hooks
  const { contentId } = useParams();
  const navigate = useNavigate();

  //기타
  const targetContent = contents.find((item) => item.id === contentId);

  return (
    <>
      <div>
        {targetContent.title}
        <br />
        {targetContent.body}
        <br />
        <button onClick={() => navigate("/")}>이전 화면으로</button>
      </div>
    </>
  );
};

export default Detail_Content;
