import { getVerifiedUserData } from "api/users";
import Main_ContentList from "components/content/Main_ContentList";
import Main_ModalForm from "components/content/Main_ModalForm";
import React, { useEffect } from "react";

function Main() {
  //유저 data
  useEffect(() => {
    getVerifiedUserData();
  }, []);

  return (
    <>
      <Main_ModalForm />
      <Main_ContentList />
    </>
  );
}

export default Main;
