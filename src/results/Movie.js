import React, { Component } from 'react';
import '../App.css';

const Movie = () => {
    return (
      <div>
       <div className="film-library">
       <h4>Try watching this movies: </h4>
       <ul>
        {this.props.films}
       </ul>
      </div>
      </div>
    );
}

export default Movie;
