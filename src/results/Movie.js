import React from 'react'
import '../App.css'

const Movie = (props) => {
    return (
      <div>
        <div className="results-movie-bg"></div>
          <h4 className="movie-result-title">Try this movie dude,</h4>
          <div className="filmPoster">
            <img className="filmPoster-Img" src={`https://image.tmdb.org/t/p/w500/${props.filmPoster}`} alt="movie poster"/>
          </div>
          <h4 className="movie-result"> <b>{props.films}</b> (Vote avg. : {props.filmVote}) </h4>
          <p className="movie-result"> <span><i>Overview:</i></span> &nbsp; {props.filmOverview}</p>
      </div>
    )
}

export default Movie