import React from 'react'
import '../App.css'

const Movie = (props) => {
    return (
      <div>
        <div className="results-movie-bg"></div>
          <h4 className="movie-result-title">Try this movie dude,</h4>
            <ul className="movie-result">
                <li>{props.films}</li>
            </ul>
            <div className="filmPoster">
              <img className="filmPoster-Img" src={`https://image.tmdb.org/t/p/w500/${props.filmPoster}`}/>
            </div>
      </div>
    )
}

export default Movie
