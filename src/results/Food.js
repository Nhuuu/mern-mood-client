import React from 'react'

const Food = (props) => {
    return(
		<div> Try eating this: {props.foodItem}
		<img src={props.poster} alt='' /></div>
      );
  	}


export default Food
