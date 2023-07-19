import Login from "components/authentication/Login";
import Footer from "components/ui/Footer";
import Header from "components/ui/Header";
import KakaoMap from "map/KakaoMap";
import Detail from "pages/Detail";
import Main from "pages/Main";
import ArtCategory from "pages/categoryPages/ArtCategory";
import BookCategory from "pages/categoryPages/BookCategory";

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
        <Route path="/dateCourse" element={<KakaoMap />} />
        <Route path="/art" element={<ArtCategory />} />
        <Route path="/book" element={<BookCategory />} />
      </Routes>

      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default Router;
