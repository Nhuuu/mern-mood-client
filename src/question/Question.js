import React, { Component } from 'react';
import SERVER_URL from '../constants/server';

const Question = (props) => {
	return(
		<div>
	    {props.question}    	
	    </div>
	  );
}

export default Question;
