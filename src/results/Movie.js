import React from 'react'
import '../App.css'

const Movie = (props) => {
    return (
      <div className="movie-result">
        <div className="results-movie-bg"></div>
         <div className="film-library">
          {props.films}
        </div>
      </div>
    )
}

export default Movie
