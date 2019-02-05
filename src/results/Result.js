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
      films: []
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
        const filmObj = json.results
        const allTitles = []
        const filmTitle = filmObj.forEach((obj, i) => {
          return allTitles.push(obj.original_title)
        })
        this.setState({
          films: allTitles
        })
        console.log(this.state.films);
      })
      .catch(error => {
        console.log("Error:", error)
      })
    }
  

  //getMusic 

  //getFood


  render() {
    const filmList = this.state.films.map((film, i) => <Movie key={i} films={film} />)
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
          {filmList}
          {/*<Movie films={films} />*/}
        </div>
    	</div>
    );
  }
}


export default Result
