import React, {Component} from 'react';
import SERVER_URL from '../constants/server';
import Weather from './Weather';
import Music from './Music';
import Food from './Food';
import Movie from './Movie';
import Output from './Output'
import axios from 'axios';
import Loader from 'react-loader-spinner' //module for loading gif
import Restaurant from './Restaurant';

// Need all of the gets to pass down as props for each component?
class Result extends Component {
  constructor(){
    super()
    this.state = {
      films: [],
      weather: '',
      food: [],
      poster: [],
      isLoading: true,  // loader
      song: ''
    }
  }

  componentDidMount(){
    this.getFilms()
    this.getWeather()
    this.getFood()
    this.getSong()
    // this.setState({isLoading: false}) // This is used for acutal loader usage:
    setTimeout(() => this.setState({isLoading: false}), 1000)  //  Set to 3 sec timeout to see the effect
  }

  getFilms = () => {
   fetch(`https://api.themoviedb.org/3/genre/35/movies?api_key=b1b4d1f42d4ead1ab1d5fb013cb9340d`)
    .then(response => response.json())
    .then(json=> {
      console.log('films got')
      const filmObj = json.results
      const allTitles = []
      const filmTitle = filmObj.forEach((obj) => {
        return allTitles.push(obj.original_title)
      })
      this.setState({
        films: allTitles
      })
    })
    .catch(error => {
      console.log("Error:", error)
    })
  }

  // Grab music
	getSong = () => {
    let token = localStorage.getItem('serverToken');
    axios.post(SERVER_URL+'/result/music', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
		.then(response => {
      console.log('can i get a music json please', response)
      
			// this.setState({ song: json })
		})
		.catch(err => {
			console.log(err)
		})
	}
  
  //getFood
  getFood = () => {
    let token = localStorage.getItem('serverToken');
    axios.post(SERVER_URL+'/result/restaurant', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
      const shuffledData = response.data.sort(function() { return 0.5 - Math.random() });
      const restaurantList = shuffledData.map((obj, i) => {
        return obj.name;
      })
      const restaurantImg = shuffledData.map((obj, i) => {
        return obj.image_url;    
      })
      console.log(restaurantImg);
      this.setState({ 
        food: restaurantList,
        poster: restaurantImg
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  // getWeather
  getWeather = () => {
    let token = localStorage.getItem('serverToken');
    axios.post(SERVER_URL+'/result/weather', {
      headers: { 'Authorization' : `Bearer ${token}` }
    })
    .then(response => {
      const currWeather= response.data.currently;
      this.setState({ weather: currWeather })
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  // getOutput
  render() {
    if(this.state.isLoading){
      return(
        <div className="loading"><Loader type="Hearts" color="#B0C0BF" height={120} width={120} /> </div>
      )
    }
      const filmList = this.state.films.map((film, i) => <Movie key={i} films={film} />)
      return(
        <div className="results">
          <div className="weather-field">
            <Weather summary={this.state.weather.summary} temp={this.state.weather.temperature} cssClass={this.state.weather.icon} />
          </div>
          <div className="output-field">
            <Output />
          </div>        
          <div className="music-field">
            <Music />
          </div>
          <div className="food-field">
              <Food foodItem={this.state.food} />
              <Restaurant poster={this.state.poster} />
          </div>
          <div className="movie-field">
            {filmList}
          </div>
        </div>
      );
  }
}
export default Result