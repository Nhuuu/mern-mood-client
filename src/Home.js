import React from 'react';
import './App.css';

const Home = () => {
  return(
    <div className="homeWrap">
      <div>
        <h3 className="center-style-title">Welcome buddy,</h3>
      </div>
      <div className="homeImg">
        <img className="homeImg" src="https://media.giphy.com/media/l4Jz3a8jO92crUlWM/giphy.gif" alt="saltygiphy"/>
      </div>
      <h3 className="center-style-title"><i>How salty are you today?!</i></h3>
    </div>
  );
}


export default Home;