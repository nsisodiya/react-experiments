

import React, {Component} from 'react';
import JSONView from '../components/JSONView.jsx';

var store = require('./todoStore');
var TodoActions = require("./TodoActions");

class T extends Component {
	constructor() {
		super();
	}
	render(){
		return <div><h1>React 3233Todo App from Console</h1>
			<JSONView store={store}></JSONView>
		</div>;
	}
}

export default T;
