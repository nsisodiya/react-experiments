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

	render() {
		return <pre>{JSON.stringify(this.state, null, ' ')}</pre>;
	}
}

export default JSONView;