import React, {Component} from 'react';

class JSONView extends Component {
	constructor(props, context) {
		super(props, context);
		var store = this.props.store;
		store.on('change', () => {
			this.setState(store.getState());
		});
		this.state = store.getState();
	}

	renderHeaderByKeys(keys) {
		return <thead>
		<tr>{
			keys.map((key) => {
				return <th>{key}</th>
			})
		}</tr>
		</thead>;
	}

	objToTable(obj) {
		if (Array.isArray(obj) === true && obj.length === 0) {
			return "[ ]";
		} else if (JSON.stringify(obj) === "{}") {
			return "{ }";
		} else {
			return <table>
				{this.renderHeaderByKeys(Object.keys(obj))}
				<tbody>
				<tr>{
					Object.keys(obj).map((key) => {
						return this.renderTd(obj[key])
					})
				}</tr>
				</tbody>
			</table>;
		}
	}

	renderTd(guess) {
		return <td>{
			(() => {
				if (Array.isArray(guess) === true) {
					if (this.checkIfArrayIsAOB(guess)) {
						return this.aobToTable(guess)
					} else {
						return this.objToTable(guess)
					}
				} else {
					if (typeof guess === "object") {
						return this.objToTable(guess)
					} else {
						return guess + "";
					}
				}
			})()
		}</td>
	}
	aobToTable(aob) {
		var keys = Object.keys(aob[0]);
		return <table>
			{this.renderHeaderByKeys(keys)}
			<tbody>
			{
				aob.map((row)=> {
					return <tr>{
						keys.map((v)=> {
							return this.renderTd(row[v]);
						})
					}</tr>;
				})
			}
			</tbody>
		</table>;
	}
	checkIfArrayIsAOB(arr) {
		if (Array.isArray(arr) === true && arr.length !== 0 && typeof arr[0] === "object") {
			var keystr = JSON.stringify(Object.keys(arr[0]).sort());
			var unmatched = arr.filter((v)=> {
				return keystr !== JSON.stringify(Object.keys(v).sort());
			});
			return unmatched.length === 0
		} else {
			return false;
		}
	}

//TODO - arning: Each child in an array or iterator should have a unique "key" prop. Check the render method of JSONView
	render() {
		return <div>{
			this.objToTable(this.state)
		}
			<pre style={{"display":"block"}}>{JSON.stringify(this.state, null, '  ')}</pre>
		</div>;
	}
}

export default JSONView;