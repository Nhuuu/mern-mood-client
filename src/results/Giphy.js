import React, { Component } from 'react'

const Giphy = (props) => {
    const giphyImg = props.giphy;
    return(
		<div> <img className="giphyPic" src ={giphyImg} alt='giphy' /> </div>
      );
  	}

export default Giphy