import { deleteContent, getContents, editContent } from "api/contents";
import useInput from "hooks/useInput";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import shortid from "shortid";

const Detail_Content = () => {
  //UseSelectors
  // const contents = useSelector((state) => state.contentsSlice);

  //hooks
  const navigate = useNavigate();
  const location = useLocation();
  console.log("콘솔4", location.state);

  const prevTitle = location.state.prevTitle;
  const prevBody = location.state.prevBody;
  const contentId = location.state.contentId;

  //UseStates
  const [editMode, setEditMode] = useState(false);
  //custom hook
  const [newTitle, onChangeNewTitleHandler, resetNewTitle] = useInput();
  const [newBody, onChangeNewBodyHandler, resetNewBody] = useInput();

  //react Query
  //DELETE
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deleteContent, {
    onSuccess: () => {
      queryClient.invalidateQueries("contents");
      console.log("DELETE 성공하였습니다😀");
    },
  });

  //UPDATE
  const updateMutation = useMutation(editContent, {
    onSuccess: () => {
      queryClient.invalidateQueries("contents");
      console.log("UPDATE 성공하였습니다😀");
    },
  });

  //❸게시글 Update
  const editModeHandler = () => {
    const confirmed = window.confirm("정말 수정하시겠습니까?");
    if (confirmed) {
      //
      setEditMode((prev) => !prev);
    }
  };
  const onSubmitEditHandler = (e) => {
    //
    e.preventDefault();

    //return 로직
    if (!newTitle || !newBody) {
      alert("제목과 본문을 모두 입력해주세요!");
      return;
    } else if (newTitle.length < 5 || newBody.length < 5) {
      alert("제목과 본문을 5글자 이상 입력해주세요!");
      return;
    }

    //
    const editedContent = {
      title: newTitle,
      body: newBody,
      id: contentId,
      isModified: true,
    };
    //
    // dispatch(editContent(editedContent));
    updateMutation.mutate(editedContent);

    resetNewTitle("");
    resetNewBody("");

    //다시 false로 바꾸기
    setEditMode(false);
  };

  // 입력 필드가 모두 비어 있는 경우 버튼 비활성화
  const isDisabled = !newTitle || !newBody;

  //❹게시글 Delete
  const deleteHandler = (targetContentId) => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (confirmed) {
      // dispatch(deleteContent(targetContentId));
      deleteMutation.mutate(targetContentId);
      navigate("/");
    }
  };

  return (
    <>
      {/* ------수정폼------ */}
      <div>
        {editMode ? (
          <>
            <form onSubmit={onSubmitEditHandler}>
              <input
                type="text"
                value={newTitle}
                onChange={onChangeNewTitleHandler}
              />
              <input
                type="text"
                value={newBody}
                onChange={onChangeNewBodyHandler}
              />
              <button disabled={isDisabled}>수정 완료</button>
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
            {prevTitle}
            <br />
            {prevBody}
          </li>
          <div>
            <button onClick={editModeHandler}>수정하기</button>
            <button onClick={() => deleteHandler(contentId)}>삭제하기</button>
            <button onClick={() => navigate("/")}>이전 화면으로</button>
          </div>
        </ul>
      </div>
    </>
  );
};
export default Detail_Content;
