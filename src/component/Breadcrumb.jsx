// breadcrumb ethukuna navbar la ulla menu hide aagitu athuku pathila home>cart intha mathiri varum

import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../style/breadcrumb.css";

const Breadcrumb = () => {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <div className="breadcrumb">
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
        return (
          <span key={index}>
            {" > "}
            <Link to={routeTo}>{name.replace("-", " ")}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
