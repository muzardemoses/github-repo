import React from "react";
import '../Assets/styles/page-not-found.css';
import errorGif from '../Assets/images/error.gif';
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";


export const PageNotFound = () => {
   const navigate = useNavigate();


  return (
    <div className="page-not-found">
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <img src={errorGif} alt="404 Error" />
      <h1>Go <span onClick={() => navigate(-1) } className="back-page"> Back</span></h1>
    </div>
  );
}

