import { getVerifiedUserData, postLoginUser } from "api/users";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
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

  //hooks
  const dispatch = useDispatch();

  //
  const accessToken = localStorage.getItem("accessToken");
  const isDisabled = accessToken;

  //react Query
  // 유저 로그인
  const queryClient = useQueryClient();
  const loginMutation = useMutation(postLoginUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("login");
      localStorage.setItem("accessToken", data.token); //로그인post요청 성공(=토큰 옴)하자마자, 로컬스토리지에 저장
      console.log("테스트>", data);
      console.log("로그인 POST 성공하였습니다😀");
      alert("로그인이 완료되었습니다!");
    },
    onError: (error) => {
      if (
        error.response.status === 401 &&
        error.response.data.message === "비밀번호가 일치하지 않습니다."
      ) {
        alert(error.response.data.message);
      } else if (
        error.response.status === 401 &&
        error.response.data.message === "존재하지 않는 유저입니다."
      ) {
        alert(error.response.data.message);
      } else if (
        error.response.status === 401 &&
        error.response.data.message.includes("id 또는 password가")
      ) {
        alert(error.response.data.message);
      }
    },
  });
  //-------------------------------------------------------------------//

  // useEffect(() => {
  //   getVerifiedUserData();
  // }, [accessToken]);

  //-------------------------------------------------------------------//

  //Event Handler
  const openLoginModal = () => {
    if (!accessToken) {
      setIsOpen(true);
    } else {
      return;
    }
  };

  //로그인폼 제출 핸들러
  const handleLoginFormSubmit = async (e) => {
    //
    e.preventDefault();

    //return 로직
    if (email === "" || pw === "") {
      alert("이메일과 비밀번호를 모두 입력해주세요!");
      return;
    }

    const newLoginUser = {
      id: email,
      password: pw,
      withCredentials: true,
    };

    //
    loginMutation.mutate(newLoginUser);

    //
    // dispatch(
    //   login({
    //     pw,
    //     email,
    //   })
    // );

    //
    setEmail("");
    setPw("");
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
          // disabled={isDisabled}
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
              <button onClick={handleLoginFormSubmit}>로그인👆</button>
            </form>

            <button onClick={closeLoginModal}>창닫기☒</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
