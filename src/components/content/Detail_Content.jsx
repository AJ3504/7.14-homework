import { deleteContent, getContents, editContent } from "api/contents";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import shortid from "shortid";

const Detail_Content = () => {
  //UseSelectors
  // const contents = useSelector((state) => state.contentsSlice);

  //UseStates
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  //hooks
  const { contentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  //GET
  const { isLoading, isError, data } = useQuery("contents", getContents); //첫번째인자인 key값이 중요 (나중에 invalidate할 때 쓰임), 두번째 인자는 비동기함수

  if (isLoading) {
    return <h1>로딩중입니다🥲</h1>;
  }
  if (isError) {
    return <h1>에러가 발생했습니다🥲</h1>;
  }

  //기타
  const targetContent = data.find((item) => item.id === contentId);
  console.log("콘솔1", targetContent);

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
    //다시 false로 바꾸기
    setEditMode(false);
  };

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
            <br />
            {targetContent?.newBody
              ? targetContent?.newBody
              : targetContent?.body}
          </li>
          <div>
            <button onClick={editModeHandler}>수정하기</button>
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
