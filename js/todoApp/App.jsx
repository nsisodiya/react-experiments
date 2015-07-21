

import React, {Component} from 'react';


var store = require('./todoStore');
var TodoActions = require("./TodoActions");

class T extends Component {
	constructor() {
		super();
		store.on('change', () => {
			console.log("change comes to view");
			this.setState(store.getState());
		});
		this.state = store.getState();
	}
	render(){
		return <div><h1>TODOs</h1>
			<pre>{JSON.stringify(this.state)}</pre>
		</div>;
	}
}

export default T;