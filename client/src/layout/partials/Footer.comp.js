import React from "react";
import "./footer.style.css";
export const Footer = () => {
  return (
    <div className="text-center copy-right footnote">
      &copy;
      <a
        href="https://www.uta.edu/academics/schools-colleges/engineering/research/centers-and-labs/software-engineering-research-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        SERC
      </a>
      {"&"}
      <a
        href="https://www.inf.unibe.ch/about_us/team/software_engineering_group_seg/index_eng.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        SEG
      </a>{" "}
      - {new Date().getFullYear()}
    </div>
  );
};
