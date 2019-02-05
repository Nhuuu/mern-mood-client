import React from 'react';
import SERVER_URL from './constants/server';
import Weather from './Weather';
import Music from './Music';
import Food from './Food';
import Movie from './Movie';



const Result = () => {
  return(
  	<div>
    	<div>
        <div className="weather-field">
          <Weather />
        </div>
        <div className="music-field">
          <Music />
        </div>
        <div className="food-field">
    		  <Food />
        </div>
        <div className="movie-field">
          <Movie/>
        </div>
    	</div>
    </div>
    )
}

export default Result
