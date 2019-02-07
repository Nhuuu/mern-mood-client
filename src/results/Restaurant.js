import React, { Component } from 'react'

export default class Restaurant extends Component {
	render() {
		let posterList = this.props.poster.map((p, i) =>  { 		
			return  <div><p key={i}> </p> 
			<img src={p} alt='' /></div>
		})
		return(
			<div>{posterList}</div>
		);
	}
}

