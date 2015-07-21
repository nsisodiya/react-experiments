/**
 * TodoActions
 */

var AppDispatcher = require('./AppDispatcher');


var TodoConstants = require("./TodoConstants");
var TodoActions = {
	create: function (text) {
		AppDispatcher.handleViewAction({
			actionType: TodoConstants.TODO_CREATE,
			text: text
		});
	},
	destroy: function (id) {
		AppDispatcher.handleViewAction({
			actionType: TodoConstants.TODO_DELETE,
			id: id
		});
	},
	markDone: function (id) {
		AppDispatcher.handleViewAction({
			actionType: TodoConstants.TODO_DELETE,
			id: id
		});
	}
};

window.TodoActions = TodoActions;
module.exports = TodoActions;