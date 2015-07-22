/**
 * TodoActions
 */

var AppDispatcher = require('./AppDispatcher');


var TodoConstants = require("./TodoConstants");

var actionAlias = {
	create: TodoConstants.TODO_CREATE,
	remove: TodoConstants.TODO_DELETE,
	markDone: TodoConstants.TODO_MARK_DONE
};

var TodoActions = {};
Object.keys(actionAlias).map(function (key) {
	TodoActions[key] = function () {
		AppDispatcher.handleViewAction({
			actionType: actionAlias[key],
			args: arguments
		});
	}
});

window.TodoActions = TodoActions;
module.exports = TodoActions;