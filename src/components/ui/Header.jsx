import Login from "components/authentication/Login";
import Logout from "components/authentication/Logout";
import Signup from "components/authentication/Signup";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function Header() {
  //useStates
  const [searchText, setSearchText] = useState("");

  //UseSelector
  const userList = useSelector((state) => state.userSlice);
  const loginUser = userList.find((user) => user.isLogin === true);
  console.log("userList테스트5>", userList);
  console.log("loginUser 테스트6>", loginUser);

  return (
    <>
      {/* 헤더1 */}
      <div
        className="header1"
        style={{
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "#1a5d1aca",
          color: "white",
          height: "70px",
        }}
      >
        <div style={{ height: "40%", marginTop: "20px" }}>
          <button type="submit" style={{ height: "100%" }}>
            A
          </button>{" "}
          blog
        </div>

        <div
          style={{
            height: "100%",
            marginTop: "20px",
            display: "flex",
          }}
        >
          <form>
            <input
              type="text"
              value={searchText}
              onChange={(e) => {
                e.preventDefault();
                setSearchText(e.target.value);
              }}
              style={{ height: "25px", width: "300px" }}
            />
          </form>
          <button type="submit" style={{ height: "30px" }}>
            🔍
          </button>
        </div>

        <div id="authentication" style={{ display: "flex" }}>
          {/* 로그인, 회원가입 */}
          <Login />
          <Signup />

          {/* 로그인 했을 때만 보이게끔 */}
          {loginUser ? (
            <div>
              {loginUser.userName}님 반갑습니다!
              <Logout />
            </div>
          ) : (
            ""
          )}

          {/* 로그아웃 */}
          {/* <div>
            <Logout />
          </div> */}
        </div>
      </div>

      {/* 헤더2 */}
      <div
        className="header2"
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "40px",
        }}
      >
        <h3 style={{ marginTop: "13px", paddingLeft: "20px" }}>블로그홈</h3>
        <h3 style={{ marginTop: "13px" }}>주제별 보기</h3>
        <h3 style={{ marginTop: "13px", paddingRight: "20px" }}>
          이달의 블로그
        </h3>
      </div>

      <hr />
    </>
  );
}

export default Header;
