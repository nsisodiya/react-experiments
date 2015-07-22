var AppDispatcher = require('./AppDispatcher');
var TodoConstants = require("./TodoConstants");
var BaseStore = require('./BaseStore');

class TodoStoreClass extends BaseStore {
	constructor() {
		super();
		this.counter = 0;
	}

	getInitialState() {
		try {
			var state = JSON.parse(window.localStorage.getItem("todoStore"));

			if (state) {
				return state;
			} else {
				return {
					todos: []
				}
			}
		} catch (ex) {
			return {
				todos: []
			}
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

	markAllDone() {
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
	[TodoConstants.TODO_MARK_DONE]: "markDone"
};


AppDispatcher.register(function (e) {
	var action = e.action;
	if (actionToMethodsMapping[action.actionType] !== undefined) {
		TodoStore[actionToMethodsMapping[action.actionType]].apply(TodoStore, action.args);
	}
});
window.store = TodoStore;
module.exports = TodoStore;