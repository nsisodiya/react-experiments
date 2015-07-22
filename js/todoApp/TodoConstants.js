var keymirror = require('keymirror');

var TodoConstants = keymirror({
	TODO_CREATE: null,
	TODO_DELETE: null,
	TODO_EDIT: null,
	TODO_MARK_DONE: null
});

module.exports = TodoConstants;