import React from "react";
import errorImg from "../../../public/assets/icons/404.png";
import './NotFound.scss';
const NotFoundPage = () => {
  return (
    <div className="errorpage">
      <img className="errorpage-image" src={errorImg} />
      <div className="errorpage-title">
        404
      </div>
      <div className="errorpage-title-text">Oh! Page not found</div>
    </div>
  );
};

export default NotFoundPage;
