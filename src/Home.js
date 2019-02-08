import React, { Component } from 'react';
import Loader from 'react-loader-spinner'; //module for loading gif

class Home extends Component {
  constructor(){
    super()
    this.state = {
      isLoading: true  // loader
    }
  }

  componentDidMount(){
    // this.setState({isLoading: false}) // This is used for acutal loader usage:
    setTimeout(() => this.setState({isLoading: false}), 1000)  //  Set to 3 sec timeout to see the effect
  }

  render() {
    if(this.state.isLoading){
      return(
        <div className="loading"><Loader type="Hearts" color="#B0C0BF" height={120} width={120} /> </div>
      )
    }
    return(
    	<div>
        <h4>Welcome,</h4>
        <h3>How are you today?</h3>
        {/* <button> Sign up or login </button> */}
      </div>
    );
  }
}


export default Home;
