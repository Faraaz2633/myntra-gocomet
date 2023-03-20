import React from "react";
import "./EmptyPage.scss";

export const EmptyPage = ({ name }) => {
  return (
    <div className="empty">
      <h1>{name}</h1>
    </div>
  );
};
