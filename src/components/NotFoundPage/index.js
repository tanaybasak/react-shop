import React from "react";
import errorImg from "../../../public/assets/icons/404.png";

const NotFoundPage = () => {
  return (
    <div className="errorpage">
      <img className="errorpage-image" src={errorImg} />
    </div>
  );
};

export default NotFoundPage;
