import React from 'react'
import '../App.css'

const Movie = (props) => {
    return (
      <div>
         <div className="film-library">
          {props.films}
        </div>
      </div>
    )
}

export default Movie
