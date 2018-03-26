import React, { Component } from 'react';
import './error.scss';

class Error extends Component {
	render() {
		return (
			<div className="error">{this.props.message}</div>
		);
	}
}

export default Error;