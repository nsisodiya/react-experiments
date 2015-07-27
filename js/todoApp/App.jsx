

import React, {Component} from 'react';
import StoreView from '../components/StoreView.jsx';

var store = require('./todoStore');
var TodoActions = require("./TodoActions");

class T extends Component {
	constructor() {
		super();
	}
	render(){
		return <div><h1>React Todo App from Console</h1>
			<StoreView store={store}></StoreView>
		</div>;
	}
}

export default T;
