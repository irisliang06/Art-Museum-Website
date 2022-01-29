import React, { useRef, useState, useEffect } from 'react';
import "./NeonText.css";

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

function NeonText(props) {
  const [ factor, setFactor ] = useState(0.0);
  const [ reverse, setReverse ] = useState(false);
  let onTick = () => {
      if (factor >= 1.0) {
        setReverse(true);
        setFactor(0.99);
      }
      else if (factor <= 0.0) {
        setReverse(false);
        setFactor(0.01);
      }
      else if (reverse) {
        if (factor < 0.2 || factor > 0.8) {
          setFactor(factor - 0.05);
        }
        else {
          setFactor(factor - 0.20);
        }
      }
      else {
        if (factor < 0.2 || factor > 0.8) {
          setFactor(factor + 0.05);
        }
        else {
          setFactor(factor + 0.20);
        }
      }
  };
  useLoop(() => {
    onTick();
  }, 64);
  let getDefClr = () => {
    return [ parseInt(props.r), parseInt(props.g), parseInt(props.b) ];
  };
  let getCurClr = () => {
    let def = getDefClr();
    return [ def[0] * factor, def[1] * factor, def[2] * factor ];
  };
  let getCurClrStr = () => {
    let cur = getCurClr();
    return `rgb(${cur[0]},${cur[1]},${cur[2]})`;
  };
  let getCurClrStrDim = () => {
    let cur = getCurClr();
    let fac = 0.7;
    return `rgb(${cur[0]*fac},${cur[1]*fac},${cur[2]*fac})`;
  };
  return (
    <span className={"NeonText " + (props.className || "")} style={{color: getCurClrStrDim(), textShadow:`2px 2px 4px ${getCurClrStr()}`}}>
      {props.value}
    </span>
  );
}

export default NeonText;