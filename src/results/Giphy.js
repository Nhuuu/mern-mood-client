import React from 'react'

const Giphy = (props) => {
  const giphyImg = props.giphy;
  return(
    <div className="giphy-result"> 
      <img className="giphyPic" src ={giphyImg} alt='giphy' /> 
    </div>
  )
}

export default Giphy