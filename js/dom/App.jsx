import React, {Component} from 'react';
import StoreView from './StoreView.jsx';
import TodoApp from './TodoApp.js';

//var store = require('./todoStore');
import worker from './initWorker.js';

window.worker = worker;

//TODO - multiple Stores,
//TODO - getInitialState
//TODO - Add localStorage !
//TODO - have better fakeStore - currently "on" function is hardcoded


worker.addEventListener('message', function (e) {
	//TODO = switch case !
	console.log("Update came");
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
		todos: [{
			"task": "Write Book",
			"done": false,
			"id": 0
		}, {
			"task": "Visit Delhi",
			"done": false,
			"id": 1
		}, {
			"task": "Learn React",
			"done": true,
			"id": 2
		}],
		completed: 1,
		uncompleted: 2
	}
};

class T extends Component {
	constructor() {
		super();
	}

	render() {
		return <div><h1>React Todo App from Console</h1>
			<TodoApp store={fakestore}></TodoApp>
		</div>;
	}
}

export default T;
