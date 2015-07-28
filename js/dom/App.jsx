import React, {Component} from 'react';
import StoreView from './StoreView.jsx';

//var store = require('./todoStore');
import worker from './initWorker.js';

window.worker = worker;

//TODO - multiple Stores,
//TODO - getInitialState

worker.addEventListener('message', function (e) {
	//TODO = switch case !
	fakestore.state = e.data;
	fakestore.callback()
}, false);

var fakestore = {
	on: function (eName, callback) {
		this.callback = callback;
	},
	getState: function () {
		return this.state;
	},
	state: {
		todos: []
	}
};

class T extends Component {
	constructor() {
		super();
	}

	render() {
		return <div><h1>React Todo App from Console</h1>
			<StoreView store={fakestore}></StoreView>
		</div>;
	}
}

export default T;
