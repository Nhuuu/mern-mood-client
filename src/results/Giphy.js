import React from 'react'

const Giphy = (props) => {
    const giphyImg = props.giphy;
    return(
      <div>
        <h4 className="giphy-result-title">Here's a funny giph for you!</h4>
        <div className="giphy-result"> 
          <img className="giphyPic" src ={giphyImg} alt='giphy' /> 
        </div>
      </div>
        );
  	}

export default Giphy