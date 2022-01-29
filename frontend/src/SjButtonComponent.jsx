import React, { useRef, useEffect } from 'react';
import "./sjButtonCom.css";
import { Link } from "react-router-dom";


function SjButtonComponent (props) {
  return (
    <Link className="subjects" to={props.link}>
      <span style={{"textShadow": `1px 1px 2px ${props.color}`}}>
        {props.name}
      </span>
    </Link>
  );
}

export default SjButtonComponent;