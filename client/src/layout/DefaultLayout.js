import React from "react";
import { Header } from "./partials/Header.comp";
import { Footer } from "./partials/Footer.comp";
export const DefaultLayout = ({ children }) => {
  return (
    <div className="default-layout">
      <div className="header mb-2">
        <Header />
      </div>

      <div className="main">{children}</div>
      <div className="pb-3">
        <Footer />
      </div>
    </div>
  );
};
