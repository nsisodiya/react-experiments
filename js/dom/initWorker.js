var myWorker = new Worker('/dist/worker.bundle.js');

/*
 * worker.postMessage({cmd: "actions.TodoActions", method: "edit", args: [e.currentTarget.dataset.todoId, text]});
 *
 *      vs
 *
 *     worker.post("/actions/TodoActions/edit", e.currentTarget.dataset.todoId, text);
 * */
myWorker.post = function (url, ...args) {
	myWorker.postMessage({cmd: url, args: args});
};
export default myWorker;