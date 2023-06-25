import React from "react";
import "./footer.style.css";
export const Footer = () => {
  return (
    <div className="text-center copy-right footnote">
      &copy; SERC all right reserved - {new Date().getFullYear()}
    </div>
  );
};
