import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "redux/modules/userSlice";

function Login() {
  //UseState
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  //UseSelector
  const userList = useSelector((state) => state.userSlice);
  const loginUser = userList.find((user) => user.isLogin === true);
  // console.log("userList테스트>", userList);
  // console.log("loginUser 테스트2>", loginUser);

  //hooks
  const dispatch = useDispatch();

  //Event Handler
  const openLoginModal = () => {
    if (!loginUser) {
      setIsOpen(true);
    } else {
      return;
    }
  };
  const closeLoginModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div style={{ height: "40%", marginTop: "20px" }}>
        <button
          type="submit"
          style={{ height: "100%" }}
          onClick={openLoginModal}
        >
          로그인
        </button>

        {isOpen && (
          <div>
            <form id="loginModalForm" className="loginModalForm">
              이메일로 로그인하기
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
              <br />
              <button
                onClick={(e) => {
                  //
                  e.preventDefault();

                  //
                  dispatch(
                    login({
                      pw,
                      email,
                    })
                  );

                  alert("로그인 완료!");
                }}
              >
                로그인👆
              </button>
            </form>

            <button onClick={closeLoginModal}>창닫기☒</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
