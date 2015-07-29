console.log("I am from WebWorker, its wow");

var todostore = require('./todoStore');

var TodoActions = require('./TodoActions');


var actionList = {};
actionList["TodoActions"] = TodoActions;


todostore.on('change', function () {
	self.postMessage(todostore.getState());
});
self.addEventListener('message', function (e) {
	console.log("Message arrived", arguments);
	var data = e.data;
	var x = data.cmd.split("/");
	x.splice(0, 1);
	var type = x[0];
	var service = x[1];
	var method = x[2];

	switch (type) {
		case 'actions':
			// PASSing  this action to Real ACTION Object
			//TODO - check, TodoActions[data.method] is a function or not !
			if (actionList[service] && actionList[service][method] && typeof actionList[service][method] === "function") {
				actionList[service][method].apply(actionList[service], data.args);
			}
			break;
		default:
			console.log("Unknown Command", data.cmd);
	}
}, false);
