var AppDispatcher = require('./AppDispatcher');
var TodoConstants = require("./TodoConstants");
var BaseStore = require('./BaseStore');

var EventEmitter = require('events').EventEmitter;

class TodoStoreClass extends BaseStore {
	constructor() {
		super();
	}

	getInitialState() {
		return {
			todos: []
		}
	}
	addTodo(text) {
		this.setState({
			todos: [...this.state.todos, {
				task: text,
				done: false,
				id: this.state.todos.length
			}]
		});
	}

	duringSetState() {
		this.state.completed = this.getTotalCompleted();
		this.state.uncompleted = this.state.todos.length - this.state.completed;
	}

	markDone(id) {
		this.setState({
			todos: this.state.todos.map(function (v) {
				if (v.id === id) {
					v.done = true;
				}
				return v;
			})
		});
	}

	markUnCompleted(id) {
		this.setState({
			todos: this.state.todos.map(function (v) {
				if (v.id === id) {
					v.done = false;
				}
				return v;
			})
		});
	}

	getTotalCompleted() {
		return this.state.todos.filter(function (v) {
			return v.done === true;
		}).length;
	}
}

var TodoStore = new TodoStoreClass();

AppDispatcher.register(function (e) {
	var action = e.action;
	switch (action.actionType) {
		case TodoConstants.TODO_CREATE:
			TodoStore.addTodo(action.text);
			break;
	}
});
window.store = TodoStore;
module.exports = TodoStore;