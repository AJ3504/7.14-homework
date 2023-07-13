import { getVerifiedUserData, postLoginUser } from "api/users";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "redux/modules/userSlice";

function Login() {
  //react Query
  // 유저 로그인
  const queryClient = useQueryClient();
  const loginMutation = useMutation(postLoginUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("login");
      localStorage.setItem("accessToken", data.token); //로그인post요청 성공(=토큰 옴)하자마자, 로컬스토리지에 저장
      console.log("테스트>", data);
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

  //유저 인증 확인 후 데이터 get
  const { isLoading, isError, userData } = useQuery(
    "user",
    getVerifiedUserData
  );

  if (isLoading) {
    return <h1>유저데이터 로딩중입니다🥲</h1>;
  }
  if (isError) {
    return <h1>유저데이터 가져오는데 에러가 발생했습니다🥲</h1>;
  }

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
                    withCredentials: true,
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
