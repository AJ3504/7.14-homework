import { getVerifiedUserData } from "api/users";
import Login from "components/authentication/Login";
import Logout from "components/authentication/Logout";
import Signup from "components/authentication/Signup";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StButton } from "styled-components/StButton";
import { Link } from "react-router-dom";

function Header() {
  //useStates
  const [searchText, setSearchText] = useState("");

  //UseSelector
  const userList = useSelector((state) => state.userSlice);
  const loginUser = userList.find((user) => user.isLogin === true);

  //
  const accessToken = localStorage.getItem("accessToken");

  //
  useEffect(() => {
    getVerifiedUserData();
  }, [accessToken]);

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
          width: "100%",
          position: "fixed",
        }}
      >
        <div style={{ height: "40%", marginTop: "20px" }}>
          <button
            type="submit"
            style={{ height: "100%", backgroundColor: "#a1b39b66" }}
          >
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
              style={{
                height: "25px",
                width: "300px",
                backgroundColor: "white",
              }}
            />
          </form>
          <button
            type="submit"
            style={{
              height: "30px",
              backgroundColor: "#a1b39b66",
              marginLeft: "10px",
            }}
          >
            🔍
          </button>
        </div>

        <div id="authentication">
          {/* 로그인 했을 때 : 로그아웃 했을 때 */}
          {loginUser ? (
            <div style={{ display: "flex" }}>
              <div style={{ position: "relative", top: "25px", right: "10px" }}>
                {loginUser.userName}님 반갑습니다!
              </div>

              <div
                style={{ position: "relative", bottom: "5px", left: "10px" }}
              >
                <Logout />
              </div>
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <Login />
              <Signup />
            </div>
          )}
          {/* 디스패치 테스트용 */}
          {/* <Logout />
          <Login />
          <Signup /> */}
        </div>
      </div>

      {/* 헤더2 */}
      <div
        className="categoryMenuBar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "40px",
          paddingTop: "70px",
        }}
      >
        <h3 style={{ marginTop: "13px", paddingLeft: "20px" }}>
          <Link to={"/"}>블로그홈</Link>
        </h3>
        <h3 style={{ marginTop: "13px" }}>
          <Link to={"/dateCourse"}>데이트코스 추천</Link>
        </h3>
        <h3 style={{ marginTop: "13px" }}>
          <Link to={"/art"}>엔터테인먼트/예술</Link>
        </h3>
        <h3 style={{ marginTop: "13px", paddingRight: "20px" }}>
          <Link to={"/book"}>책</Link>
        </h3>
      </div>

      <hr />
    </>
  );
}

export default Header;
