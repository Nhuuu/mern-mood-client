import React, { Component } from 'react';

class Question extends Component {
  	render() {
	    return(
	    	<div className="question">
	        <p>{this.props.question}</p>
	        </div>
		);
  	}
}

export default Question;
