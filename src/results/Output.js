import React, { Component } from 'react'

class Output extends Component {
  render() {
    return(
    	<div>
			<h1>{ this.props.output }</h1>
        </div>
    );
  }
}

export default Output
