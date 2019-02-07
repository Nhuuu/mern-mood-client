import React from 'react'
import '../App.css'

const Movie = (props) => {
    return (
      <div>
         <div className="film-library">
        	<ul>
       	  		<li>{props.films}</li>
        	</ul>
        </div>
      </div>
    )
}

export default Movie
