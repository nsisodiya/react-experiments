import React, {Component} from 'react';
import StoreView from './StoreView.jsx';
import TodoApp from './TodoApp.js';

import FakeStore from './fakeStore';

import worker from './initWorker.js';

window.worker = worker;

//TODO - multiple Stores,
//TODO - Add localStorage !
//TODO - have FLUX on Server side


var fakeTodoStore = new FakeStore({
	worker: worker,
	cmdOnStateUpdate: "/stores/TodoStore/updateState",
	cmdGetInitialState: "/stores/TodoStore/getInitialState"
});

class T extends Component {
	constructor() {
		super();
	}

//	componentDidMount() {
//		TodoStore.addChangeListener(this._onChange);
//	}

	componentWillUnmount() {
		fakeTodoStore.destroy();
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
			<TodoApp store={fakeTodoStore}></TodoApp>
		</div>;
	}
}

export default T;
