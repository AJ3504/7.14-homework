import { getVerifiedUserData } from "api/users";
import Main_ContentList from "components/content/Main_ContentList";
import Main_ModalForm from "components/content/Main_ModalForm";
import React, { useEffect } from "react";

//
const accessToken = localStorage.getItem("accessToken");

function Main() {
  //유저 data
  useEffect(() => {
    getVerifiedUserData();
  }, [accessToken]);

  return (
    <>
      <Main_ModalForm />
      <Main_ContentList />
    </>
  );
}

export default Main;
