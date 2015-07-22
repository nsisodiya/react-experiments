var AppDispatcher = require('./AppDispatcher');
var TodoConstants = require("./TodoConstants");
var BaseStore = require('./BaseStore');

class TodoStoreClass extends BaseStore {
	constructor() {
		super();
		if (this.state.todos.length !== 0) {
			this.counter = this.state.todos[this.state.todos.length - 1].id + 1;
		} else {
			this.counter = this.state.todos.length;
		}
	}

	getInitialState() {
		var defaultState = {
			todos: []
		};
		try {
			var state = JSON.parse(window.localStorage.getItem("todoStore"));
			if (state !== null && state !== undefined) {
				return state;
			} else {
				return defaultState;
			}
		} catch (ex) {
			return defaultState;
		}
	}
	addTodo(text) {
		this.setState({
			todos: [...this.state.todos, {
				task: text,
				done: false,
				id: this.counter
			}]
		});
		this.counter++;
	}

	duringSetState() {
		this.state.completed = this.getTotalCompleted();
		this.state.uncompleted = this.state.todos.length - this.state.completed;
		window.localStorage.setItem("todoStore", JSON.stringify(this.state));
	}

	markComplete(id) {
		this.setState({
			todos: this.state.todos.map(function (v) {
				if (v.id === id) {
					v.done = true;
				}
				return v;
			})
		});
	}

	remove(id) {
		this.setState({
			todos: this.state.todos.filter(function (v) {
				return v.id !== id;
			})
		});
	}

	remoteAllCompleted() {
		this.setState({
			todos: this.state.todos.filter(function (v) {
				return v.done === false;
			})
		});
	}

	markAllComplete() {
		this.setState({
			todos: this.state.todos.map(function (v) {
				v.done = true;
				return v;
			})
		});
	}

	markAllUnComplete() {
		this.setState({
			todos: this.state.todos.map(function (v) {
				v.done = false;
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
var actionToMethodsMapping = {
	[TodoConstants.TODO_CREATE]: "addTodo",
	[TodoConstants.TODO_DELETE]: "remove",
	[TodoConstants.TODO_MARK_DONE]: "markComplete"
};


AppDispatcher.register(function (e) {
	var action = e.action;
	if (actionToMethodsMapping[action.actionType] !== undefined) {
		TodoStore[actionToMethodsMapping[action.actionType]].apply(TodoStore, action.args);
	}
});
window.store = TodoStore;
module.exports = TodoStore;