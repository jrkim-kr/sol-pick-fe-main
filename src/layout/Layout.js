import React from "react";
import Wrapper from "./Wrapper";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout">
      <div className="layout-container">
        {/* 노치 디자인 */}
        <div className="notch-overlay"></div>

        {/* 콘텐츠 스크롤 영역 */}
        <Wrapper>
          <Outlet />
        </Wrapper>
      </div>
    </div>
  );
};

export default Layout;
