import Login from "components/authentication/Login";
import Footer from "components/ui/Footer";
import Header from "components/ui/Header";
import Detail from "pages/Detail";
import Main from "pages/Main";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail/:contentId" element={<Detail />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default Router;
