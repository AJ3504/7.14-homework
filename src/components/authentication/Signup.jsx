import { addSignupUser } from "api/users";
import { response } from "msw";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { join } from "redux/modules/userSlice";

const Signup = () => {
  //react Query
  const queryClient = useQueryClient();
  const signupMutation = useMutation(addSignupUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("register");
      console.log("회원가입 POST 성공하였습니다😀");
      alert("회원가입이 완료되었습니다!");
    },
    onError: (error) => {
      if (
        error.response.status === 401 &&
        error.response.data.message === "이미 존재하는 유저 id입니다."
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

  //UseState
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confPw, setConfPw] = useState("");
  const [name, setName] = useState("");

  //UseSelector
  const userList = useSelector((state) => state.userSlice);
  const loginUser = userList.find((user) => user.isLogin === true);

  //hooks
  const dispatch = useDispatch();

  //
  const accessToken = localStorage.getItem("accessToken");
  const isDisabled = !accessToken;

  //Event Handler
  const openSignupModal = () => {
    if (!loginUser || !accessToken) {
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
          // disabled={isDisabled}
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
                  if (
                    email === "" ||
                    pw === "" ||
                    confPw === "" ||
                    name === ""
                  ) {
                    alert(
                      "이메일, 비밀번호, 확인비밀번호, 이름을 모두 입력해주세요!"
                    );
                    return;
                  } else if (pw !== confPw) {
                    alert("비밀번호가 다릅니다. 확인해주세요!");
                    return false;
                  }

                  const newUser = {
                    id: email,
                    password: pw,
                  };

                  signupMutation.mutate(newUser);

                  //
                  // dispatch(
                  //   join({
                  //     pw,
                  //     email,
                  //     name,
                  //   })
                  // );

                  setEmail("");
                  setPw("");
                  setConfPw("");
                  setName("");
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
