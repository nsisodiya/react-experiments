var AppDispatcher = require('./AppDispatcher');
var TodoConstants = require("./TodoConstants");


var EventEmitter = require('events').EventEmitter;

class TodoStoreClass extends EventEmitter {
	constructor() {
		super();
		this.state = {
			todos: []
		};
	}

	addTodo(text) {
		this.state.todos.push({
			task: text,
			done: false
		});
		this.emit('change');
	}

	getState() {
		return this.state;
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