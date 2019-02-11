import React, { Component } from 'react'

export default class Restaurant extends Component {
	render() {
		let posterList = this.props.poster.map((p, i) =>  { 		
			return  <div><p key={i}> </p> 
			<img className="foodImg" src={p} alt='' /></div>
		})
		return(
			<div className="foodImg">{posterList[0]}</div>
		);
	}
}