import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { join } from "redux/modules/userSlice";

const Signup = () => {
  //UseState
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confPw, setConfPw] = useState("");
  const [name, setName] = useState("");

  //UseSelector
  const userList = useSelector((state) => state.userSlice);
  const loginUser = userList.find((user) => user.isLogin === true);
  // console.log("userList테스트3>", userList);
  // console.log("loginUser 테스트4>", loginUser);

  //hooks
  const dispatch = useDispatch();

  //Event Handler
  const openSignupModal = () => {
    if (!loginUser) {
      setIsOpen(true);
    } else {
      return;
    }
  };
  const closeSignupModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div style={{ height: "40%", marginTop: "20px" }}>
        <button
          type="submit"
          style={{ height: "100%" }}
          onClick={openSignupModal}
        >
          회원가입
        </button>

        {isOpen && (
          <div>
            <form id="signupModalForm" className="signupModalForm">
              <br />
              <input
                value={email}
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value);
                }}
                placeholder="이메일를 입력해주세요."
              />
              <input
                value={pw}
                onChange={(e) => {
                  e.preventDefault();
                  setPw(e.target.value);
                }}
                placeholder="비밀번호를 입력해주세요."
              />
              <input
                value={confPw}
                onChange={(e) => {
                  e.preventDefault();
                  setConfPw(e.target.value);
                }}
                placeholder="입력했던 비밀번호와 동일한 비밀번호를 입력해주세요."
              />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력해주세요."
              />
              <br />
              <button
                onClick={(e) => {
                  //
                  e.preventDefault();

                  //return 로직
                  if (pw !== confPw) {
                    alert("비밀번호가 다릅니다. 확인해주세요!");
                    return false;
                  }

                  //
                  dispatch(
                    join({
                      pw,
                      email,
                      name,
                    })
                  );

                  alert(`${name}님 회원가입 완료!`);
                }}
              >
                회원가입👆
              </button>
            </form>

            <button onClick={closeSignupModal}>창닫기☒</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Signup;
