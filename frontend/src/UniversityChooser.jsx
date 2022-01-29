import React, { useRef, useState, useEffect } from 'react';
import "./UniversityChooser.css";
import NeonText2 from "./NeonText2.jsx";
import arrow from "./arrow.png";
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link } from "react-router-dom";

function UniversityChooser(props) {
  return (
    <div className="UniversityChooser">
      <Link to="/" style={{textDecoration: "none", color: "black"}}>
        <div className="backCont">
          <img className="backCont-arr" src={arrow}/>
          &nbsp;&nbsp;
          <div className="backCont-back">
            BACK
          </div>
        </div>
      </Link>
    </div>
  );
}

export default UniversityChooser;