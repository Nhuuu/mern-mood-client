import React, { Component } from 'react';
import './App.css';


class Movie extends Component {
  constructor(){
    super();
    this.state = {
      films:[{}]
    }
  }

componentDidMount(){
		//fetch movie per genre (35 is for comedy)
		fetch(`https://api.themoviedb.org/3/genre/35/movies?api_key=b1b4d1f42d4ead1ab1d5fb013cb9340d`)
		.then(response => response.json())
		.then((json)=> {
			this.setState({
				films: json
			})
			console.log(this.state.films)
		})
		.catch(error => {
			console.log("Error:", error);
		})
	}


  render() {
  	const filmList = this.state.films.map((filmObj, i) => <li key={filmObj.id}>filmObj.original_title</li>)
    return (
      <div>
       <div className="film-library">
       <h4>Try watching this movies: </h4>
       <h4>{this.props.film}</h4>
       {filmList}
      </div>
      </div>
    );
  }
}

export default Movie;
