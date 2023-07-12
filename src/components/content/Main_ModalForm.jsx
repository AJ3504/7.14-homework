import React, { useState } from "react";
import useInput from "hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
// import { addContent } from "redux/modules/contentsSlice";
import { addContent } from "api/contents";
import shortid from "shortid";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";

const Main_ModalForm = () => {
  //react Query
  const queryClient = useQueryClient();
  //새로고침 없이 바로 업데이트되는 로직
  const mutation = useMutation(addContent, {
    //변경이 일어난 경우, 갱신해줘야 하는 데이터 없는지 생각 -> 있다면, 해당 쿼리 key를 invalidate
    onSuccess: () => {
      queryClient.invalidateQueries("contents");
      console.log("POST 성공하였습니다😀");
    },
  });

  //UseStates
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  //custom hook
  const [title, onChangeTitleHandler, resetTitle] = useInput();
  const [body, onChangeBodyHandler, resetBody] = useInput();

  //UseSelector
  const userList = useSelector((state) => state.userSlice);
  const loginUser = userList.find((user) => user.isLogin === true);
  console.log("loginUser 테스트>", loginUser);

  //기타
  const options = ["엔터테인먼트/예술", "책", "데이트코스 추천"];

  //hooks
  const dispatch = useDispatch();

  //Event Handler
  //모달
  const openContentModal = () => {
    if (loginUser) {
      setIsOpen(true);
    } else {
      alert("로그인 먼저 해주세요!");
      return;
    }
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  //select
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  //
  const onSubmitHandler = (e) => {
    e.preventDefault();

    //return 로직
    if (!title || !body) {
      alert("제목과 본문을 모두 입력해주세요!");
      return;
    } else if (title.length < 5 || body.length < 5) {
      alert("제목과 본문을 5글자 이상 입력해주세요!");
      return;
    }

    const newContent = {
      //게시글정보
      title,
      body,
      id: shortid.generate(),
      //유저정보
      writerId: loginUser.id,
      writerName: loginUser.userName,
    };

    // dispatch(addContent(newContent));
    mutation.mutate(newContent);

    resetTitle("");
    resetBody("");
  };

  // 입력 필드가 모두 비어 있는 경우 버튼 비활성화
  const isDisabled = !title || !body;

  return (
    <div>
      <button onClick={openContentModal}>게시글 쓰기</button>

      {isOpen && (
        <div>
          <form id="modalForm" className="modalForm" onSubmit={onSubmitHandler}>
            {/* selectArea */}
            <div
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
            >
              <span> {selectedOption || "선택해주세요!"} </span>
              <span>▼</span>
            </div>
            {isOpen && (
              <div>
                {options.map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      handleOptionClick(option);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
            {/*  */}
            게시글 제목
            <input type="text" value={title} onChange={onChangeTitleHandler} />
            <br />
            게시글 내용
            <textarea type="text" value={body} onChange={onChangeBodyHandler} />
            <br />
            <button disabled={isDisabled}>게시글 등록하기</button>
            <button onClick={closeModal}>창닫기☒</button>
          </form>
        </div>
      )}
    </div>
  );
};

//StC 요소
const StModalBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StModalContents = styled.div`
  background-color: #f7e6c4;
  padding: 20px;
  width: 70%;
  height: 50%;
  border-radius: 12px;
`;

export default Main_ModalForm;
