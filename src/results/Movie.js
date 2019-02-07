import React from 'react'
import '../App.css'

const Movie = (props) => {
    return (
      <div className="movie-result">
        <div className="results-movie-bg"></div>
         <div className="film-library">
        	<ul>
       	  		<li>{props.films}</li>
        	</ul>
        </div>
      </div>
    )
}

export default Movie
