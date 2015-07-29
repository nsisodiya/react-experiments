import React, {Component} from 'react';
import StoreView from './StoreView.jsx';
import TodoApp from './TodoApp.js';

//var store = require('./todoStore');
import worker from './initWorker.js';

window.worker = worker;

//TODO - multiple Stores,
//TODO - Add localStorage !
//TODO - have better fakeStore - currently "on" function is hardcoded


worker.addEventListener('message', function (e) {
	//TODO = switch case !
	var cmd = e.data.cmd;
	if (cmd === "/stores/TodoStore/updateState") {
		console.log("cmd -> ", cmd);
		fakestore.setState(e.data.args[0]);
	}
}, false);


//TODO - make a fakeStore better..
var fakestore = {
	on: function (eName, callback) {
		this.callback = callback;
	},
	getState: function () {
		return this.state;
	},
	setState: function (state) {
		fakestore.state = state;
		fakestore.callback()
	}
};

worker.get("/stores/TodoStore/getInitialState", (state)=> {
	//console.log("Received State from Worker");
	fakestore.setState(state);
});

class T extends Component {
	constructor() {
		super();
	}

	render() {
		return <div><h1>React Todo App from Console</h1>

			<div>
				<h3>Open Console and copy paste following commands</h3>
				<pre>
					worker.post("/actions/TodoActions/addTodo", "Using Webworker is fun");
				</pre>
				<pre>
					worker.post("/actions/TodoActions/markComplete", 0);
				</pre>
			</div>
			<TodoApp store={fakestore}></TodoApp>
		</div>;
	}
}

export default T;
