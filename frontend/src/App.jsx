import React, { useRef, useEffect, useState } from 'react';
import MyD3Component from "./MyD3Component.jsx";
import './App.css';
import neonSign from "./neonsign.gif";
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams } from "react-router-dom";

import SjButtonComponent from "./SjButtonComponent.jsx";
import NeonText from './NeonText.jsx';
import NeonText2 from './NeonText2.jsx';
import axios from "axios";
import { getSubjectColor, getUniversityColor } from './GenerateColors.jsx';
import arrow from "./arrow.png";

/* App */
function App() {

    return (
        <Router>
          <Routes>
            <Route exact path="/" element={
              <div className="App">
                <img src={neonSign} className="neonSign"/>
                <div className="startText">SELECT A SUBJECT TO GET STARTED</div>
                <SubjectChooser></SubjectChooser>
              </div>
            }/>
            <Route exact path="/subject/:subject" element={<UniversityChooser/>}/>
          </Routes>
        </Router>
    )

}

function splitColor(x) {
  let a = x.substr(1, 2);
  let b = x.substr(3, 2);
  let c = x.substr(5, 2);
  let r = parseInt(a, 16);
  let g = parseInt(b, 16);
  let _b = parseInt(c, 16);
  return [r, g, _b];
}

function SubjectChooser(props) {
  const [subjects, setSubjects] = useState([]);
  const [obtained, setObtained] = useState(false);
  if (!obtained) {
    axios.get("/getSubjects").then((res) => {
      let x = [];
      for (let i = 0; i < res.data.length; ++i) {
        x.push({ id: res.data[i], color: getSubjectColor(res.data[i]), split: splitColor(getSubjectColor(res.data[i])) });
      }
      setSubjects( x );
      setObtained(true);
    }).catch((err) => {
      console.log(err);
      console.log("Failed to request subject list from server.");
    });
  }
  return (
    subjects.map((x, i) => {
      return (
        <Link key={x.id} className="subjectLink" to={`/subject/${x.id.toLowerCase()}`}>
          <NeonText value={x.id.toUpperCase()} r={x.split[0]} g={x.split[1]} b={x.split[2]}></NeonText>
        </Link>
      );
    })
  );
}

function embedLink(url) {
  let x = new URL(url);
  console.log(x.origin);
  if (x.origin.indexOf("youtu.be") != -1) {
    let y = x.pathname.substr(1);
    return `https://www.youtube.com/embed/${y}`;
  }
  else {
    let y = x.searchParams.get("v");
    return `https://www.youtube.com/embed/${y}`;
  }
}

function VideoPlayer(props) {
  if (!(props.show || false)) {
    return (null);
  }
  let x = embedLink(props.video);
    return (
      <div className="vp-div">
        <div className="vp-in">
          <div className="vp-div-3">
            {props.name}
          </div>
          <div class="video-container">
          <iframe
              width="100%"
              height="100%"
              src={x}
              title={""}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
          ></iframe>
          </div>
          <div onClick={()=>{props.onClose();}} className="vp-div-2">
            <NeonText value="BACK" r={255} g={10} b={10}/>
          </div>
        </div>
      </div>
    );
}

function UniversityChooser(props) {
  const { subject } = useParams();
  const [videos, setVideos] = useState([]);
  const [obtained, setObtained] = useState(false);
  const [show, setShow] = useState(false);
  const [video, setVideo] = useState("");
  const [name, setName] = useState("");
  if (!obtained) {
    axios.get(`/getVideosBySubject/${subject}`).then((res) => {
      let x = [];
      for (let i = 0; i < res.data.length; ++i) {
        x.push({ id: res.data[i].title, value: res.data[i], color: getUniversityColor(res.data[i].university), split: splitColor(getUniversityColor(res.data[i].university)) });
      }
      setVideos(x);
      setObtained(true);
    }).catch((err) => {
      console.log(err);
      console.log("Failed to request video list from server.");
    });
  }
  return (
    <div className="UniversityChooser">
      <VideoPlayer name={name} video={video} show={show} onClose={()=>{setShow(false);}}></VideoPlayer>
      <Link to="/" style={{textDecoration: "none", color: "black"}}>
        <div className="backCont">
          <img className="backCont-arr" src={arrow}/>
          &nbsp;&nbsp;
          <div className="backCont-back">
            BACK
          </div>
        </div>
      </Link>
      {videos.map((x, i) => {
        return (
          <div className="videoLink" onClick={()=>{
            setName(x.value.title);
            setVideo(x.value.url);
            setShow(true);
            }}>
            <NeonText2 value={x.id.toUpperCase()} value1={x.value.university.toUpperCase()} r={x.split[0]} g={x.split[1]} b={x.split[2]}></NeonText2>
          </div>
        );
      })}
    </div>
  );
}



export default App;