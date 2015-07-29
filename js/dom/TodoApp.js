/**
 * Created by narendrasisodiya on 29/07/15.
 */

import React, {Component} from 'react';
import worker from './initWorker.js';

//TODO - store.off when componentdidUmount

//TODO = Double Click to Edit
//TODO = Routing
//TODO = Test Cases !

class TodoApp extends Component {
	constructor(props, context) {
		super(props, context);
		var store = this.props.store;
		//TODO - Think if you can use PropChange evnet ??
		store.on('change', () => {
			this.setState(store.getState());
		});
		this.state = store.getState();
	}

	handleBlur() {

	}

	handleChange() {

	}

	markComplete(e) {
		var url;
		if (e.currentTarget.checked) {
			url = "/actions/TodoActions/markComplete";
		} else {
			url = "/actions/TodoActions/markUnComplete";
		}
		worker.post(url, e.currentTarget.dataset.todoId);
	}

	toggleAll(e) {
		var url;
		if (e.currentTarget.checked) {
			url = "/actions/TodoActions/markAllComplete";
		} else {
			url = "/actions/TodoActions/markAllUnComplete";
		}
		worker.post(url);
	}

	handleSubmit(e) {
		const text = e.currentTarget.value.trim();
		if (e.which === 13 && text !== "") {
			worker.post("/actions/TodoActions/addTodo", text);
			e.currentTarget.value = "";
		}
	}

	handleEdit(e) {
		const text = e.currentTarget.value.trim();
		if (e.which === 13) {
			var id = e.currentTarget.dataset.todoId;
			if (text === "") {
				worker.post("/actions/TodoActions/remove", id);
			} else {
				worker.post("/actions/TodoActions/edit", id, text);
			}
		}
	}

	handleDoubleClick(e) {
		//editing flag
	}

	handleRemove(e) {
		var id = e.currentTarget.dataset.todoId;
		worker.post("/actions/TodoActions/remove", id);
	}

	clearCompleted(e) {
		worker.post("/actions/TodoActions/removeAllCompleted");
	}

	render() {
		return <div>
			<section className="todoapp">
				<header className="header">
					<h1>todos</h1>
					<input onBlur={this.handleBlur.bind(this)}
							onChange={this.handleChange.bind(this)}
							onKeyDown={this.handleSubmit.bind(this)} className="new-todo"
							placeholder="What needs to be done?"></input>
				</header>
				<section className="main">
					<input onChange={this.toggleAll.bind(this)} className="toggle-all" type="checkbox"></input>
					<ul className="todo-list">
						{
							this.state.todos.map((v, i)=> {
								return <li key={v.id} className={v.done?"completed":""}>
									<div className="view">
										<input data-todo-id={v.id} onChange={this.markComplete.bind(this)} className="toggle"
												type="checkbox" checked={v.done}></input>
										<label onDoubleClick={this.handleDoubleClick.bind(this)}>{v.task}</label>
										<button data-todo-id={v.id} onClick={this.handleRemove.bind(this)} className="destroy"></button>
									</div>
									<input data-todo-id={v.id}
											onChange={this.handleChange.bind(this)}
											onKeyDown={this.handleEdit.bind(this)} className="edit"></input>
								</li>
							})
						}
					</ul>
				</section>
				{
					this.state.todos.length > 0
							? <footer className="footer">
					<span className="todo-count">
										<strong>{this.state.uncompleted}</strong><span> </span><span>item</span><span> left</span></span>
						<ul className="filters">
							<li ><a href="#/" className="selected">All</a></li>
							<span> </span>
							<li ><a href="#/active" className="">Active</a></li>
							<span> </span>
							<li><a href="#/completed" className="">Completed</a></li>
						</ul>
						{
							this.state.completed > 0 ?
									<button onClick={this.clearCompleted.bind(this)} className="clear-completed">Clear
										completed</button> : ""
						}

					</footer>
							: ""
				}
			</section>
		</div>;
	}
}

export default TodoApp;