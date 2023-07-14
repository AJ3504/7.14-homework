import React, { useState } from "react";
import useInput from "hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
// import { addContent } from "redux/modules/contentsSlice";
import { addContent } from "api/contents";
import shortid from "shortid";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { StButton } from "styled-components/StButton";

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
  const [selectAreaIsOpen, setSelectAreaIsOpen] = useState(false);
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
  const accessToken = localStorage.getItem("accessToken");

  //hooks
  const dispatch = useDispatch();

  //Event Handler
  //모달
  const openContentModal = () => {
    if (accessToken) {
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
    setSelectedOption(option); //해당 필드 클릭시, null->option값으로 바뀌고,
    setSelectAreaIsOpen(false); //닫힘
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
      // writerId: loginUser.id,
      // writerName: loginUser.userName,
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
      <div style={{ display: "flex", paddingRight: "20px" }}>
        <StButton onClick={openContentModal} style={{ marginLeft: "auto" }}>
          게시글 쓰기
        </StButton>
      </div>

      {isOpen && (
        <StModalBox>
          <StModalContents>
            <div
              className="innerContainer"
              style={{ position: "relative", bottom: "20px" }}
            >
              <form
                id="modalForm"
                className="modalForm"
                onSubmit={onSubmitHandler}
              >
                {/* ---selectArea------------------------------------ */}
                <div>
                  <DropdownWrapper>
                    <DropdownHeader
                      onClick={() => {
                        setSelectAreaIsOpen((prev) => !prev);
                      }}
                    >
                      <span> {selectedOption || "선택해주세요!"} </span>
                      <span>▼</span>
                    </DropdownHeader>

                    {selectAreaIsOpen && (
                      <DropdownList>
                        {options.map((option) => (
                          <DropdownItem
                            key={option}
                            onClick={() => {
                              handleOptionClick(option);
                            }}
                          >
                            {option}
                          </DropdownItem>
                        ))}
                      </DropdownList>
                    )}
                  </DropdownWrapper>
                </div>
                {/* ---------------------------------------------------- */}
                <div className="inputArea" style={{ marginTop: "30px" }}>
                  게시글 제목
                  <br />
                  <input
                    type="text"
                    value={title}
                    onChange={onChangeTitleHandler}
                    style={{
                      width: "320px",
                      height: "60px",
                      marginBottom: "20px",
                    }}
                  />
                  <br />
                  게시글 내용
                  <br />
                  <textarea
                    type="text"
                    value={body}
                    onChange={onChangeBodyHandler}
                    style={{ width: "320px", height: "120px" }}
                  />
                  <br />
                </div>
                <div
                  className="StButtonArea"
                  style={{
                    position: "relative",
                    top: "30px",
                    left: "350px",
                  }}
                >
                  <StButton disabled={isDisabled}>게시글 등록하기</StButton>
                  <StButton onClick={closeModal}>창닫기☒</StButton>
                </div>
              </form>
            </div>
          </StModalContents>
        </StModalBox>
      )}
    </div>
  );
};

//StC
//모달
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
  display: flex;
  align-items: center;
  justify-content: center;
`;

//selectArea
const DropdownWrapper = styled.div`
  width: 200px;
  border: 1px solid #ccc;
  position: relative;
  margin-bottom: 10px;
`;

const DropdownHeader = styled.div`
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const DropdownList = styled.div`
  border-top: 1px solid #ccc;
  /* 부모영역 바깥으로 삐져나오게 */
  position: absolute;
  width: 200px;
  border: 1px solid #ccc;
  background-color: #ffffff;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;

export default Main_ModalForm;
