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
		return <thread>
			<tr>
				{
					keys.map((key) => {
						return <th>{key}</th>
					})
				}
			</tr>
		</thread>;
	}

	objToTable(obj) {
		if (Array.isArray(obj) === true && obj.length === 0) {
			return "[ ]";
		} else {
			return <table>
				{this.renderHeaderByKeys(Object.keys(obj))}
				<tbody>
				<tr>
					{
						Object.keys(obj).map((key) => {
							return <td> {
								(() => {
									return this.decideFurther(obj[key]);
								})()
							}</td>
						})
					}
				</tr>
				</tbody>
			</table>;
		}
	}

	aobToTable(aob) {
		var keys = Object.keys(aob[0]);

		return <table>
			{this.renderHeaderByKeys(keys)}
			<tbody>
			{
				aob.map((row)=> {
					return <tr> {
						keys.map((v)=> {
							return <td>{
								(()=> {
									return this.decideFurther(row[v]);
								})()
							}</td>;
						})
					}</tr>;
				})
			}
			</tbody>
		</table>;
	}

	decideFurther(guess) {
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
	}

	checkIfArrayIsAOB(arr) {
		if (Array.isArray(arr) === true) {
			if (arr.length !== 0) {
				console.log(typeof arr[0]);
				if (typeof arr[0] === "object") {
					var keystr = JSON.stringify(Object.keys(arr[0]).sort());

					var unmatched = arr.filter((v)=> {
						return keystr !== JSON.stringify(Object.keys(v).sort());
					});
					return unmatched.length === 0
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	render() {
		return <div>{
			this.objToTable(this.state)
		}
			<pre style={{"display":"block"}}>{JSON.stringify(this.state, null, '  ')}</pre>
		</div>;
	}
}

export default JSONView;