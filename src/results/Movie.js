import React from 'react'
import '../App.css'

const Movie = (props) => {
    return (
      <div className="movie-result">
        <div className="results-movie-bg"></div>
         <div className="film-library">
          <h4>Try this movie dude:</h4>
            <ul>
                <li>{props.films}</li>
            </ul>
        </div>
      </div>
    )
}

export default Movie
