import React from 'react'

const Food = (props) => {
    return(
		<div> 
      <h4 className="food-result-title">Check this place out!</h4>
      <h5 className="food-result">{props.foodItem[0]}(Rating:{props.rating[0]})</h5>
      <h5 className="food-result">{props.phone[0]}</h5>
      <h5 className="food-result">{props.address[0]}</h5>
    </div>

      );
  	}


export default Food
