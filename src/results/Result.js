import React, {Component} from 'react';
// import SERVER_URL from '../constants/server';
import Weather from './Weather';
import Music from './Music';
import Food from './Food';
import Movie from './Movie';


// Need all of the gets to pass down as props for each component?
class Result extends Component {
  constructor(){
    super()
    this.state = {
      films:[{}]
    }
  }

  componentDidMount(){
    //fetch movie per genre (35 is for comedy)
    this.getFilms()
  }

  getFilms = () => {
     fetch(`https://api.themoviedb.org/3/genre/35/movies?api_key=b1b4d1f42d4ead1ab1d5fb013cb9340d`)
      .then(response => response.json())
      .then((json)=> {
        this.setState({
          films: json
        })
        // console.log(json);
        console.log(json.results);
      })
      .catch(error => {
        console.log("Error:", error)
      })
    }
  

  //getMusic 

  //getFood


  render() {
    const filmList = this.state.films.map((filmObj, i) => <li key={i}> {filmObj.original_title} </li>)
    return(
    	<div className="results">
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
          <Movie films={filmList} />
        </div>
    	</div>
    );
  }
}


export default Result
