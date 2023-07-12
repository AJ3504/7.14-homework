import { postLoginUser } from "api/users";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "redux/modules/userSlice";

function Login() {
  //react Query
  const queryClient = useQueryClient();
  //새로고침 없이 바로 업데이트되는 로직
  const loginMutation = useMutation(postLoginUser, {
    //변경이 일어난 경우, 갱신해줘야 하는 데이터 없는지 생각 -> 있다면, 해당 쿼리 key를 invalidate
    onSuccess: () => {
      queryClient.invalidateQueries("login");
      console.log("로그인 POST 성공하였습니다😀");
    },
  });

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

                  const newLoginUser = {
                    id: email,
                    password: pw,
                  };

                  //
                  loginMutation.mutate(newLoginUser);

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
