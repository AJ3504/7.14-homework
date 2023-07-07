import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContent } from "redux/modules/content";
import shortid from "shortid";
import styled from "styled-components";

const Main_ModalForm = () => {
  //UseStates
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  //기타
  const options = ["엔터테인먼트/예술", "책", "데이트코스 추천"];

  //hooks
  const dispatch = useDispatch();

  //Event Handler
  //모달
  const openModal = () => {
    setIsOpen(true);
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
    }

    const newContnet = {
      title,
      body,
      id: shortid.generate(),
    };

    dispatch(addContent(newContnet));

    setTitle("");
    setBody("");
  };

  return (
    <div>
      <button onClick={openModal}>게시글 쓰기</button>
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
            작성자 아이디 <input />
            게시글 제목
            <input
              type="text"
              value={title}
              onChange={(e) => {
                e.preventDefault();
                setTitle(e.target.value);
              }}
            />
            <textarea
              type="text"
              value={body}
              onChange={(e) => {
                e.preventDefault();
                setBody(e.target.value);
              }}
            />
            <button>게시글 등록하기</button>
            <button onClick={closeModal}>창닫기</button>
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
