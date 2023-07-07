import React, { useState } from "react";

function Header() {
  //useStates
  const [searchText, setSearchText] = useState("");

  return (
    <>
      {/* 헤더1 */}
      <div
        className="header1"
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#606C5D",
        }}
      >
        <>
          <button type="submit">A</button> blog
        </>

        <>
          <form>
            <input
              type="text"
              value={searchText}
              onChange={(e) => {
                e.preventDefault();
                setSearchText(e.target.value);
              }}
            />
          </form>
          <button type="submit">🔍</button>
        </>

        <>
          <button type="submit">로그인</button>
        </>
      </div>

      <hr />

      {/* 헤더2 */}
      <div
        className="header2"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <>
          <h3>블로그홈</h3>
        </>
        <>
          <h3>주제별 보기</h3>
        </>
        <>
          <h3>이달의 블로그</h3>
        </>
      </div>

      <hr />
    </>
  );
}

export default Header;
