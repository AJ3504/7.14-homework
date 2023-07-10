import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteContent, editContent } from "redux/modules/contentsSlice";
import shortid from "shortid";

const Detail_Content = () => {
  //UseSelectors
  const contents = useSelector((state) => state.contentsSlice);

  //UseStates
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  //hooks
  const { contentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //기타
  const targetContent = contents.find((item) => item.id === contentId);
  console.log("콘솔1", targetContent);

  //❸게시글 Update (성공)
  const editHandler = (targetContentId) => {
    //
    setEditMode((prev) => !prev);
  };

  //❹게시글 Delete
  const deleteHandler = (targetContentId) => {
    dispatch(deleteContent(targetContentId));
    navigate("/");
  };

  return (
    <>
      {/* ------수정폼------ */}
      <div>
        {editMode ? (
          <>
            <form
              onSubmit={(e) => {
                //
                e.preventDefault();
                //
                const editedContent = {
                  title: newTitle,
                  body: newBody,
                  id: contentId,
                  isModified: true,
                };
                //
                dispatch(editContent(editedContent));
                //다시 false로 바꾸기
                setEditMode(false);
              }}
            >
              <input
                type="text"
                value={newTitle}
                onChange={(e) => {
                  e.preventDefault();
                  setNewTitle(e.target.value);
                }}
              />
              <input
                type="text"
                value={newBody}
                onChange={(e) => {
                  e.preventDefault();
                  setNewBody(e.target.value);
                }}
              />
              <button>수정 완료</button>
            </form>
          </>
        ) : null}
      </div>

      {/* ------결과물(수정결과물 : 기존결과물)------ */}
      <div className="container">
        <ul
          style={{
            border: "solid",
            margin: "10px",
            padding: "10px",
          }}
        >
          <li>
            {targetContent?.newTitle
              ? targetContent?.newTitle
              : targetContent?.title}
            {targetContent?.newBody
              ? targetContent?.newBody
              : targetContent?.body}
          </li>
          <div>
            <button onClick={() => editHandler(targetContent?.id)}>
              수정하기
            </button>
            <button onClick={() => deleteHandler(targetContent?.id)}>
              삭제하기
            </button>
            <button onClick={() => navigate("/")}>이전 화면으로</button>
          </div>
        </ul>
      </div>
    </>
  );
};
export default Detail_Content;
