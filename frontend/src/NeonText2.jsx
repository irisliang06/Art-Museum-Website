import React, { useRef, useState, useEffect } from 'react';
import "./NeonText2.css";
import NeonText from "./NeonText.jsx";

let useLoop = (proc, dt) => {
  const cb = useRef();
  useEffect(() => { cb.current = proc; }, [proc]);
  useEffect(() => {
    let onTick = () => {
      cb.current();
    };
    if (dt !== null) {
      let id = setInterval(onTick, dt);
      return () => clearInterval(id);
    }
  }, [dt]);
};

function NeonText2(props) {
  const [other, setOther] = useState(true);
  useLoop(()=>{
    setOther(!other);
  }, 5000);
  let fixed0 = props.value;
  if (other) {
    return (
      <div className="outlineContainer">
        <div className="outlineNeon" style={{border: `4px solid rgb(${props.r}, ${props.g}, ${props.b})`}}>
          <NeonText className="biggerSize" value={props.value1} r={props.r} g={props.g} b={props.b}></NeonText>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="outlineContainer">
        <div className="outlineNeon" style={{border: `4px solid rgb(${props.r}, ${props.g}, ${props.b})`}}>
          <NeonText className="smallerSize" value={fixed0} r={props.r} g={props.g} b={props.b}></NeonText>
        </div>
      </div>
    );
  }
}

export default NeonText2;