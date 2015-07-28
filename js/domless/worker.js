console.log("I am from WebWorker, its wow");

var todostore = require('./todoStore');

var TodoActions = require('./TodoActions');


todostore.on('change', function () {
	self.postMessage(todostore.getState());
});
self.addEventListener('message', function (e) {
	var data = e.data;
	switch (data.cmd) {
		case 'TodoActions':
			// PASS this action to Real TODO ACTION Object.
			TodoActions[data.method].apply(TodoActions, data.args);
			//self.postMessage('WORKER STARTED: ' + data.msg);
			break;
		default:
			console.log("Unknown Command");
	}
	;
}, false);
