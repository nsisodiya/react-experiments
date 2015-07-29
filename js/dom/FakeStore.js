/**
 * Created by narendrasisodiya on 29/07/15.
 */


var EventEmitter = require('events').EventEmitter;

class FakeStore extends EventEmitter {
	constructor(config) {
		super();

		var worker = config.worker;

		//TODO - removeEventListener ??
		worker.addEventListener('message', (e) => {
			var cmd = e.data.cmd;
			if (cmd === config.cmdOnStateUpdate) {
				this.setState(e.data.args[0]);
			}
		}, false);
		worker.get(config.cmdGetInitialState, (state)=> {
			//console.log("Received State from Worker");
			this.setState(state);
		});

	}

	getState() {
		return this.state;
	}

	setState(state) {
		this.state = state;
		this.emit('change');
	}
}
module.exports = FakeStore;